import React from "react";
import { useState,useEffect } from "react";
import JobCard from "../components/JobCard";
function SavedJobs() {
  const [jobs, setJobs] = useState([]);
  const [csrfToken, setCsrfToken] = useState(""); 

  useEffect(() => {
  fetch("http://localhost:8000/api/csrf/", {
    credentials: "include"
  })
    .then((response) => response.json())
    .then((data) => {
      setCsrfToken(data.csrfToken);
    })
    .catch((error) => {
      console.log("CSRF error:", error);
    });
}, []);
useEffect(() => {
  fetch("http://localhost:8000/api/saved-jobs/", {
  credentials: "include"
})
    .then((response) => response.json())
      .then((data) => {
  console.log("Saved jobs from API:", data);

  Promise.all(
    data.map((savedJob) =>
      fetch(`http://127.0.0.1:8000/api/jobs/${savedJob.job}/`)
        .then((response) => response.json())
        .then((job) => ({
          ...job,
          savedJobId: savedJob.id
        }))
    )
  ).then((jobs) => {
    setJobs(jobs);
  });
});
}, []);
//   const savedJobs = localStorage.getItem("savedJobs");



// const initialJobs = savedJobs
//   ? JSON.parse(savedJobs)
//   : []; 


// const [jobs, setJobs] = useState(initialJobs);

// const removeSavedJob = (id) => {
//   const updatedJobs = jobs.filter((job) => job.id !== id);

//   setJobs(updatedJobs);

//   localStorage.setItem(
//     "savedJobs",
//     JSON.stringify(updatedJobs)
//   );
// };
const removeSavedJob = (savedJobId) => {
  fetch(`http://localhost:8000/api/saved-jobs/${savedJobId}/`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "X-CSRFToken": csrfToken
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Delete failed");
      }

      setJobs((currentJobs) =>
        currentJobs.filter((job) => job.savedJobId !== savedJobId)
      );
    })
    .catch((error) => {
      console.log("Delete error:", error);
    });
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
  savedJobId={job.savedJobId}
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