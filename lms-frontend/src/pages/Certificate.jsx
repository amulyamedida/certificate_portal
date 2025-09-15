import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API_BASE_URL from "../config";

function Certificate() {
  const { resultId } = useParams();
  const { token } = useAuth();

  const handleDownload = () => {
    fetch(`${API_BASE_URL}/api/certificate/${resultId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `certificate_${resultId}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
  };

  return (
    <div className="certificate">
      <h2>Certificate</h2>
      <button className="btn" onClick={handleDownload}>
        Download PDF
      </button>
    </div>
  );
}

export default Certificate;
