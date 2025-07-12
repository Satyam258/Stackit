import Answer from "../models/answer.model.js";
import Question from "../models/question.model.js";

// POST: Create a new answer for a question
export const createAnswer = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Answer content is required" });
    }

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    const answer = new Answer({
      content,
      author: req.user._id,
      question: questionId,
    });

    await answer.save();

    // Push answer to the question's answers array
    question.answers.push(answer._id);
    await question.save();

    res.status(201).json({
      message: "Answer submitted successfully",
      answer,
    });
  } catch (error) {
    console.error("Create Answer Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// GET: Fetch all answers for a question
export const getAnswersByQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;

    const answers = await Answer.find({ question: questionId })
      .populate("author", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json({ answers });
  } catch (error) {
    console.error("Fetch Answers Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// POST: Upvote an answer
export const upvoteAnswer = async (req, res) => {
  try {
    const { answerId } = req.params;
    const userId = req.user._id;

    const answer = await Answer.findById(answerId);
    if (!answer) return res.status(404).json({ message: "Answer not found" });

    if (!answer.upvotes.includes(userId)) {
      answer.upvotes.push(userId);
      answer.downvotes = answer.downvotes.filter(
        (id) => id.toString() !== userId.toString()
      );
      await answer.save();
    }

    res.status(200).json({ message: "Answer upvoted", answer });
  } catch (error) {
    console.error("Upvote Answer Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// POST: Downvote an answer
export const downvoteAnswer = async (req, res) => {
  try {
    const { answerId } = req.params;
    const userId = req.user._id;

    const answer = await Answer.findById(answerId);
    if (!answer) return res.status(404).json({ message: "Answer not found" });

    if (!answer.downvotes.includes(userId)) {
      answer.downvotes.push(userId);
      answer.upvotes = answer.upvotes.filter(
        (id) => id.toString() !== userId.toString()
      );
      await answer.save();
    }

    res.status(200).json({ message: "Answer downvoted", answer });
  } catch (error) {
    console.error("Downvote Answer Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const acceptAnswer = async (req, res) => {
  try {
    const { answerId } = req.params;

    const answer = await Answer.findById(answerId).populate("question");
    if (!answer) return res.status(404).json({ message: "Answer not found" });

    const question = await Question.findById(answer.question._id);

  
    if (req.user._id.toString() !== question.author.toString()) {
      return res.status(403).json({ message: "Only the author can accept answers" });
    }

    question.isResolved = true;
    question.resolvedBy = answer._id;
    await question.save();

    res.status(200).json({ message: "Answer accepted", question });
  } catch (error) {
    console.error("Accept Answer Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
