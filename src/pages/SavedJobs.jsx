import React from "react";
import { useState } from "react";
import JobCard from "../components/JobCard";
function SavedJobs() {
  const savedJobs = localStorage.getItem("savedJobs");



const initialJobs = savedJobs
  ? JSON.parse(savedJobs)
  : []; 


const [jobs, setJobs] = useState(initialJobs);

const removeSavedJob = (id) => {
  const updatedJobs = jobs.filter((job) => job.id !== id);

  setJobs(updatedJobs);

  localStorage.setItem(
    "savedJobs",
    JSON.stringify(updatedJobs)
  );
};

  return (
    <main>
      <h1>Saved Jobs</h1>

      {jobs.length > 0 ? (
        <div>
         {jobs.map((job) => (
        <JobCard
  key={job.id}
  job={job}
  onRemove={removeSavedJob}
/>
  
))}
          
        </div>
      ) : (
        <p>No saved jobs yet.</p>
      )}
    </main>
  );
}

export default SavedJobs;