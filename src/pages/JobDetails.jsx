import {useParams, Link} from "react-router-dom";
// import Jobs from "../data/Jobs";
import { useState, useEffect } from "react";

function JobDetails(){
     const { id } = useParams();
     const [csrfToken, setCsrfToken] = useState("");

       const [job, setJob] = useState(null);
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
  fetch(`http://127.0.0.1:8000/api/jobs/${id}/`)
    .then((response) => response.json())
    .then((data) => {
      setJob(data);
    });
}, [id]);
if (!job) {
  return <p>Loading job details...</p>;
}
const saveJob = () => {
  fetch("http://localhost:8000/api/saved-jobs/", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
        "X-CSRFToken": csrfToken
    },
    body: JSON.stringify({
      job: job.id
    })
  })
    .then((response) => {
      console.log("Save job status:", response.status);

      if (!response.ok) {
        throw new Error("Failed to save job");
      }

      return response.json();
    })
    .then((data) => {
      console.log("Saved job:", data);
    })
    .catch((error) => {
      console.log("Save job error:", error);
    });
};

  // const job = Jobs.find((job) => job.id === Number(id));

  return (
    <main className="job-details">
      <div>
        <h1>{job.title}</h1>

      <p>Company: {job.company}</p>
      <p>Location: {job.location}</p>
      <p>Job Type: {job.type}</p>
      <p>Salary: {job.salary}</p>

      <h4>Job Description</h4>
      <p>{job.description}</p>

      <Link to={`/applications/apply?job=${job.id}`}>Apply Now</Link>
      <button onClick={saveJob}>Save Job</button>
      </div>
    </main>
  );
}

export default JobDetails;
