import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String }, // stored as rich HTML
  tags: [String],
  askedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  votes: { type: Number, default: 0 },
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Answer" }],
  acceptedAnswer: { type: mongoose.Schema.Types.ObjectId, ref: "Answer", default: null },
}, { timestamps: true });

module.exports = mongoose.model("Question", questionSchema);
