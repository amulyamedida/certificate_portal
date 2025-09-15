import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Certificate from "./pages/Certificate";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/quiz"
            element={
              <ProtectedRoute>
                <Quiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="/result"
            element={
              <ProtectedRoute>
                <Result />
              </ProtectedRoute>
            }
          />
          <Route
            path="/certificate/:resultId"
            element={
              <ProtectedRoute>
                <Certificate />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
