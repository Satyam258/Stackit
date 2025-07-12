import express from "express";
import {
  castVote,
  removeVote,
  countVotes,
} from "../controllers/vote.controller.js";
import { verifyAuth } from "../middlewares/verifyAuth.js";

const router = express.Router();


router.post("/", verifyAuth, castVote);

router.delete("/", verifyAuth, removeVote);

router.get("/:targetId/:targetType", countVotes);

export default router;
