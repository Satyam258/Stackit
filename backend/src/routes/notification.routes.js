import express from "express";
import {
  createNotification,
  getUserNotifications,
  markAsRead,
  deleteNotification,
} from "../controllers/notification.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.use(requireAuth);

router.post("/", createNotification);

router.get("/", getUserNotifications);

router.patch("/:notificationId/read", markAsRead);

router.delete("/:notificationId", deleteNotification);

export default router;
