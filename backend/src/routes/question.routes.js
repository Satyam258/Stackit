import express from "express";
import {
  askQuestion,
  getAllQuestions,
  getQuestionById,
  upvoteQuestion,
  downvoteQuestion,
} from "../controllers/question.controller.js";
import { verifyAuth } from "../middlewares/verifyAuth.js";

const router = express.Router();

// 
router.post("/", verifyAuth, askQuestion);


router.get("/", getAllQuestions);

router.get("/:id", getQuestionById);


router.post("/:id/upvote", verifyAuth, upvoteQuestion);


router.post("/:id/downvote", verifyAuth, downvoteQuestion);

export default router;
