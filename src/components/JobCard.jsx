
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const JobCard = ({ job, onRemove, savedJobId }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchSavedJobs = async () => {
      try {
        // Don't fetch saved jobs when logged out
        if (localStorage.getItem("isLoggedIn") !== "true") {
          setIsSaved(false);
          return;
        }

        const response = await fetch(
          "https://jobfinder-react.onrender.com/api/saved-jobs/",
          { credentials: "include" }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch saved jobs");
        }

        const data = await response.json();

        if (!cancelled) {
          const alreadySaved = data.some(
            (savedJob) => savedJob.job === job.id
          );
          setIsSaved(alreadySaved);
        }
      } catch (error) {
        console.log("Fetch saved jobs error:", error);
      }
    };

    fetchSavedJobs();

    return () => {
      cancelled = true;
    };
  }, [job.id]);

  const toggleSave = async () => {
    if (isSaved || saving) {
      return;
    }

    if (localStorage.getItem("isLoggedIn") !== "true") {
      window.location.href = "/login";
      return;
    }

    setSaving(true);

    try {
      const csrfResponse = await fetch(
        "https://jobfinder-react.onrender.com/api/csrf/",
        { credentials: "include" }
      );

      if (!csrfResponse.ok) {
        throw new Error("Failed to get CSRF token");
      }

      const csrfData = await csrfResponse.json();

      const response = await fetch(
"https://jobfinder-react.onrender.com/api/saved-jobs/",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfData.csrfToken
          },
          body: JSON.stringify({ job: job.id })
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save job");
      }

      const data = await response.json();
      console.log("Job saved:", data);
      setIsSaved(true);
    } catch (error) {
      console.log("Save error:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <p>{job.company}</p>
      <p>{job.location}</p>
      <p>{job.type}</p>
      <p>{job.salary}</p>

      <Link to={`/jobs/${job.id}`}>View Details</Link>

      <button onClick={toggleSave} disabled={isSaved || saving}>
        {saving ? "Saving..." : isSaved ? "Saved" : "Save Job"}
      </button>

      {onRemove && (
        <button onClick={() => onRemove(savedJobId)}>
          Remove Saved Job
        </button>
      )}
    </div>
  );
};

export default JobCard;
