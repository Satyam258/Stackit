
import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  content: { type: String, required: true }, // rich text HTML
  question: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
  answeredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  votes: { type: Number, default: 0 },
  isAccepted: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Answer", answerSchema);