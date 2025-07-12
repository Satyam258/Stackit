import Comment from "../models/comment.model.js";
import Question from "../models/question.model.js";
import Answer from "../models/answer.model.js";


export const createComment = async (req, res) => {
  try {
    const { content, questionId, answerId } = req.body;

    if (!content || (!questionId && !answerId)) {
      return res.status(400).json({ message: "Missing content or target ID" });
    }

    const comment = new Comment({
      content,
      author: req.user._id,
      question: questionId || undefined,
      answer: answerId || undefined,
    });

    await comment.save();

    res.status(201).json({
      message: "Comment created successfully",
      comment,
    });
  } catch (error) {
    console.error("Create Comment Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getComments = async (req, res) => {
  try {
    const { questionId, answerId } = req.query;

    const filter = questionId
      ? { question: questionId }
      : answerId
      ? { answer: answerId }
      : {};

    const comments = await Comment.find(filter)
      .populate("author", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json({ comments });
  } catch (error) {
    console.error("Fetch Comments Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const upvoteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id;

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (!comment.upvotes.includes(userId)) {
      comment.upvotes.push(userId);
      comment.downvotes = comment.downvotes.filter(
        (id) => id.toString() !== userId.toString()
      );
      await comment.save();
    }

    res.status(200).json({ message: "Comment upvoted", comment });
  } catch (error) {
    console.error("Upvote Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const downvoteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id;

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (!comment.downvotes.includes(userId)) {
      comment.downvotes.push(userId);
      comment.upvotes = comment.upvotes.filter(
        (id) => id.toString() !== userId.toString()
      );
      await comment.save();
    }

    res.status(200).json({ message: "Comment downvoted", comment });
  } catch (error) {
    console.error("Downvote Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
