
import { useState } from "react";
import "./ResumeAnalyzer.css";

function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [skills, setSkills] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function analyzeResume() {
    if (!file) {
      setError("Please select a PDF resume.");
      return;
    }

    if (!skills.trim()) {
      setError("Please enter the required skills.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("required_skills", skills);

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(
        "http://127.0.0.1:8001/upload-resume",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Resume analysis failed.");
      }

      setResult(data);
    } catch (err) {
      setError(err.message || "Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="resume-page">
      <div className="resume-card">
        <h1>Resume Analyzer</h1>
        <p className="subtitle">
          Discover how well your resume matches a job's requirements.
        </p>

        <div className="form-group">
          <label>Upload PDF Resume</label>
          <input
            type="file"
            accept=".pdf,application/pdf"
            onChange={(e) => {
              setFile(e.target.files[0] || null);
              setResult(null);
              setError("");
            }}
          />
          {file && <p className="file-name">{file.name}</p>}
        </div>

        <div className="form-group">
          <label>Required Skills</label>
          <input
            type="text"
            placeholder="Python, Django, SQL, React"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
          <small>Separate each skill with a comma.</small>
        </div>

        <button
          className="analyze-button"
          onClick={analyzeResume}
          disabled={loading}
        >
          {loading ? "Analyzing your resume..." : "Analyze Resume"}
        </button>

        {error && <p className="error-message">{error}</p>}
      </div>

      {result && (
        <div className="results-card">
          <h2>Analysis Results</h2>

          <div className="score-section">
            <h3>{result.match_percentage}%</h3>
            <p>Resume Skill Match</p>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{
                  width: `${result.match_percentage}%`,
                }}
              />
            </div>
          </div>

          <div className="skills-grid">
            <div className="skill-card matched-card">
              <h3>Matched Skills</h3>
              <p>
                {result.matched_skills.length
                  ? result.matched_skills.join(", ")
                  : "No matching skills found."}
              </p>
            </div>

            <div className="skill-card missing-card">
              <h3>Missing Skills</h3>
              <p>
                {result.missing_skills.length
                  ? result.missing_skills.join(", ")
                  : "No missing skills!"}
              </p>
            </div>
          </div>

          <div className="suggestion-card">
            <h3>Suggestion</h3>
            <p>{result.suggestion}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResumeAnalyzer;
