import express from "express";
import {
  createComment,
  getComments,
  upvoteComment,
  downvoteComment,
} from "../controllers/comment.controller.js";
import { verifyAuth } from "../middlewares/verifyAuth.js";

const router = express.Router();

router.post("/", verifyAuth, createComment);

router.get("/", getComments);

router.post("/:commentId/upvote", verifyAuth, upvoteComment);

router.post("/:commentId/downvote", verifyAuth, downvoteComment);

export default router;
