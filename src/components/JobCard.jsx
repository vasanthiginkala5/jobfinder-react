import React from 'react'
import {Link} from "react-router-dom";
import { useState ,useEffect} from "react";
const JobCard = ({job, onRemove}) => {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
  const savedJobs =
    JSON.parse(localStorage.getItem("savedJobs")) || [];

  const alreadySaved = savedJobs.some(
    (savedJob) => savedJob.id === job.id
  );

  setIsSaved(alreadySaved);
}, [job.id]);

const toggleSave = () => {
  const savedJobs =
    JSON.parse(localStorage.getItem("savedJobs")) || [];

  if (isSaved) {
    const updatedJobs = savedJobs.filter(
      (savedJob) => savedJob.id !== job.id
    );

    localStorage.setItem(
      "savedJobs",
      JSON.stringify(updatedJobs)
    );

    setIsSaved(false);
  } else {
    savedJobs.push(job);

    localStorage.setItem(
      "savedJobs",
      JSON.stringify(savedJobs)
    );

    setIsSaved(true);
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
        <button onClick={toggleSave}>
  {isSaved ? "Saved" : "Save Job"}

  {onRemove && (
  <button onClick={() => onRemove(job.id)}>
    Remove Saved Job
  </button>
)}
</button>
    </div>
  );
}

export default JobCard;
