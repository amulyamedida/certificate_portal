import Result from "../models/Result.js";

export const getUserResults = async (req, res) => {
  try {
    const { userId } = req.params;
    const results = await Result.find({ userId });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
