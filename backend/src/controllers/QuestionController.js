import Question from "../models/Question.js";

exports.createQuestion = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const askedBy = req.user.id;
    

    const question = await Question.create({
      title,
      description,
      tags,
      askedBy,
    });

    res.status(201).json({ success: true, question });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate("askedBy", "username").sort({ createdAt: -1 });
    res.status(200).json({ success: true, questions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSingleQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate("askedBy", "username")
      .populate({
        path: "answers",
        populate: { path: "answeredBy", select: "username" }
      });

    if (!question) return res.status(404).json({ message: "Question not found" });

    res.status(200).json({ success: true, question });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });
    res.status(200).json({ success: true, message: "Question deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.answerQuestion = async (req, res) => {
  try {
    const { content } = req.body;
    const answeredBy = req.user.id;
    const questionId = req.params.id;

    const answer = await Answer.create({
      content,
      question: questionId,
      answeredBy,
    });

    await Question.findByIdAndUpdate(questionId, {
      $push: { answers: answer._id },
    });

    res.status(201).json({ success: true, answer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};