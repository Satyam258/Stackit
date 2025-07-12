import Answer from "../models/Answer.js";
import Question from "../models/Question.js";


// Upvote answer
exports.upvoteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) return res.status(404).json({ message: "Answer not found" });
    answer.votes += 1;
    await answer.save();
    res.status(200).json({ success: true, votes: answer.votes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Downvote answer
exports.downvoteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) return res.status(404).json({ message: "Answer not found" });
    answer.votes -= 1;
    await answer.save();
    res.status(200).json({ success: true, votes: answer.votes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Accept answer
exports.acceptAnswer = async (req, res) => {
  try {
    const answerId = req.params.id;
    
    const answer = await Answer.findById(answerId);
    if (!answer) return res.status(404).json({ message: "Answer not found" });

    const question = await Question.findById(answer.question);
    if (!question) return res.status(404).json({ message: "Question not found" });
    if (question.askedBy.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await Answer.updateMany({ question: question._id }, { isAccepted: false });
    answer.isAccepted = true;
    await answer.save();

    question.acceptedAnswer = answer._id;
    await question.save();

    res.status(200).json({ success: true, message: "Answer accepted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin delete answer
exports.deleteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findByIdAndDelete(req.params.id);
    if (!answer) return res.status(404).json({ message: "Answer not found" });
    res.status(200).json({ success: true, message: "Answer deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
