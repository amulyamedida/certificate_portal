import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  quizId: { type: String, required: true },
  questionText: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: String, required: true }
});

export default mongoose.model("Question", questionSchema);
