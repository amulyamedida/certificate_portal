import express from "express";
import { getUserResults } from "../controllers/resultController.js";

const router = express.Router();

router.get("/:userId", getUserResults);

export default router;
