import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";

dotenv.config();


connectDB();

const app = express();


app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/certificate", certificateRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
