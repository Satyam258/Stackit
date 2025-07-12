import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["answer", "comment", "mention", "badge", "system"],
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    link: {
      type: String,
      default: null,
    },
    isRead: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

export const Notification = mongoose.model("Notification", notificationSchema);
