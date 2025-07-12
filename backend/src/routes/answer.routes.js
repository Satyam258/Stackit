import express from "express";
import {
  createAnswer,
  getAnswersByQuestion,
  upvoteAnswer,
  downvoteAnswer,
  acceptAnswer,
} from "../controllers/answer.controller.js";
import { verifyAuth } from "../middlewares/verifyAuth.js";

const router = express.Router();

router.post("/:questionId", verifyAuth, createAnswer);

router.get("/:questionId", getAnswersByQuestion);

router.post("/:answerId/upvote", verifyAuth, upvoteAnswer);

router.post("/:answerId/downvote", verifyAuth, downvoteAnswer);

router.patch("/:answerId/accept", verifyAuth, acceptAnswer);

export default router;
