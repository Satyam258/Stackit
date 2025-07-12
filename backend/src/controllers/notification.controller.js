import { Notification } from "../models/notification.model.js";


export const createNotification = async (req, res) => {
  try {
    const { recipient, type, message, link } = req.body;

    if (!recipient || !type || !message) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const notification = await Notification.create({ recipient, type, message, link });

    res.status(201).json({
      message: "Notification created",
      notification
    });
  } catch (error) {
    console.error("Create notification error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getUserNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    const notifications = await Notification.find({ recipient: userId })
      .sort({ createdAt: -1 });

    res.json({ notifications });
  } catch (error) {
    console.error("Get notifications error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;

    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.json({ message: "Notification marked as read", notification });
  } catch (error) {
    console.error("Mark as read error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;

    const notification = await Notification.findByIdAndDelete(notificationId);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.json({ message: "Notification deleted" });
  } catch (error) {
    console.error("Delete notification error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
