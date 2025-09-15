import express from "express";
import { getQuestions, submitAnswers } from "../controllers/quizController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:quizId", protect, getQuestions);
router.post("/submit", protect, submitAnswers);

export default router;
