import Question from "../models/question.model.js";
// import Tag from "../models/tag.model.js";
//import Tag from "../models/tag.model.js";

export const askQuestion = async (req, res) => {
  try {
    const { title, description, tags } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const question = new Question({
      title,
      description,
      tags,
      author: req.user._id,
    });

    await question.save();

    res.status(201).json({
      message: "Question posted successfully",
      question,
    });
  } catch (error) {
    console.error("Ask Question Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .populate("author", "username email")
      .populate("tags", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({ questions });
  } catch (error) {
    console.error("Fetch Questions Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await Question.findById(id)
      .populate("author", "username email")
      .populate("tags", "name")
      .populate("answers");

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

  
    question.views += 1;
    await question.save();

    res.status(200).json({ question });
  } catch (error) {
    console.error("Get Question Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const upvoteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const question = await Question.findById(id);
    if (!question) return res.status(404).json({ message: "Question not found" });

    if (!question.upvotes.includes(userId)) {
      question.upvotes.push(userId);
      question.downvotes = question.downvotes.filter(
        (uid) => uid.toString() !== userId.toString()
      );
      await question.save();
    }

    res.status(200).json({ message: "Question upvoted", question });
  } catch (error) {
    console.error("Upvote Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const downvoteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const question = await Question.findById(id);
    if (!question) return res.status(404).json({ message: "Question not found" });

    if (!question.downvotes.includes(userId)) {
      question.downvotes.push(userId);
      question.upvotes = question.upvotes.filter(
        (uid) => uid.toString() !== userId.toString()
      );
      await question.save();
    }

    res.status(200).json({ message: "Question downvoted", question });
  } catch (error) {
    console.error("Downvote Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
