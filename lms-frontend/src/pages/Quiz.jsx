import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const { user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/quiz/quiz1", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setQuestions(res.data);
        setAnswers(Array(res.data.length).fill(""));
      })
      .catch((err) => {
        if (err.response?.status === 400 && err.response.data.resultId) {
          navigate(`/certificate/${err.response.data.resultId}`);
        } else {
          console.error("Error fetching questions:", err);
        }
      });
  }, [token, navigate]);

  const handleAnswer = (option) => {
    const newAnswers = [...answers];
    newAnswers[current] = option;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/quiz/submit",
        { userId: user.id, quizId: "quiz1", answers },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate("/result", {
        state: {
          result: res.data.result,
          score: res.data.score,
          total: questions.length,
        },
      });
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  if (questions.length === 0) return <p>Loading...</p>;

  return (
    <div className="quiz">
      <h2>
        Question {current + 1} of {questions.length}
      </h2>
      <p>{questions[current].questionText}</p>

      <div className="options">
        {questions[current].options.map((opt, i) => (
          <button
            key={i}
            className={`option ${answers[current] === opt ? "selected" : ""}`}
            onClick={() => handleAnswer(opt)}
          >
            {opt}
          </button>
        ))}
      </div>

      <div className="quiz-nav">
        <button
          className="btn"
          onClick={() => setCurrent(current - 1)}
          disabled={current === 0}
        >
          Previous
        </button>

        {current < questions.length - 1 ? (
          <button className="btn" onClick={() => setCurrent(current + 1)}>
            Next
          </button>
        ) : (
          <button className="btn" onClick={handleSubmit}>
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
}

export default Quiz;
