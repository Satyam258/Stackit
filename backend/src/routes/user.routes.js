import express from "express";
import {
  getMe,
  getUserById,
  updateUserProfile,
  updateUserProficiencies,
} from "../controllers/user.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();


router.get("/me", requireAuth, getMe);


router.get("/:userId", getUserById);


router.patch("/me", requireAuth, updateUserProfile);


router.patch("/me/proficiencies", requireAuth, updateUserProficiencies);

export default router;
