import Question from "../models/Question.js";
import Result from "../models/Result.js";

export const getQuestions = async (req, res) => {
  try {
    const { quizId } = req.params;

    console.log("👉 quizId from request:", quizId);
    console.log("👉 user from token:", req.user);

    
    const existingResult = await Result.findOne({
      userId: req.user.id,
      quizId,
    });

    if (existingResult) {
      return res.status(400).json({
        message: "You have already completed this quiz",
        resultId: existingResult._id,
      });
    }

    const questions = await Question.find({ quizId });
    console.log("👉 questions fetched:", questions);

    res.json(questions);
  } catch (error) {
    console.error("❌ Error in getQuestions:", error);
    res.status(500).json({ message: error.message });
  }
};


export const submitAnswers = async (req, res) => {
  try {
    const { userId, quizId, answers } = req.body;

   
    const existingResult = await Result.findOne({ userId, quizId });
    if (existingResult) {
      return res.status(400).json({
        message: "You have already completed this quiz",
        resultId: existingResult._id,
      });
    }

    const questions = await Question.find({ quizId });

    let score = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) {
        score++;
      }
    });

    const result = await Result.create({
      userId,
      quizId,
      score,
      totalQuestions: questions.length,
      passThreshold: Math.ceil(questions.length / 2), 
      date: new Date(),
    });

    res.json({ message: "Quiz submitted", score, result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
