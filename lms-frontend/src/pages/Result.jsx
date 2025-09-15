import { useLocation, Link, useNavigate } from "react-router-dom";

function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <p>No result found</p>;

  const { result, score, total } = state;  
  const pass = score >= (result.passThreshold || Math.ceil(total / 2)); 

  return (
    <div className="result">
      <h2>Quiz Completed!</h2>
      <p>
        Score: {score} / {total}
      </p>
      <p>Status: {pass ? "Pass ✅" : "Fail ❌"}</p>

      {pass ? (
        <Link to={`/certificate/${result._id}`} className="btn">
          Download Certificate
        </Link>
      ) : (
        <button className="btn" onClick={() => navigate("/quiz")}>
          Attempt Again
        </button>
      )}
    </div>
  );
}

export default Result;
