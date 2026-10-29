import React from 'react'
import {useState, useEffect} from "react";
import {useSearchParams} from "react-router-dom";
// import Jobs from '../data/Jobs';

const Application = () => {
  const [csrfToken, setCsrfToken] = useState("");
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [reason,setReason]=useState("");
    const [submitted,setSubmitted]=useState(false);

    const [searchParams] = useSearchParams();
    const jobId = searchParams.get("job");
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
  fetch(`http://localhost:8000/api/jobs/${jobId}/`)
    .then((response) => response.json())
    .then((data) => {
      setJob(data);
    });
}, [jobId]);
    console.log("Job ID:",jobId)
    // const job = Jobs.find((job) => job.id === Number(jobId));
    


    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log("Submit button clicked");
        const application = {
  job: job.id,
  name: name,
  email: email,
  reason: reason
};

fetch("http://localhost:8000/api/applications/", {
  method: "POST",
  credentials: "include",
  headers: { 
  "Content-Type": "application/json",
  "X-CSRFToken": csrfToken
},
  body: JSON.stringify(application)
})
  .then((response) => {
  console.log("POST status:", response.status);

  if (!response.ok) {
    throw new Error("Application was not created");
  }

  return response.json();
})
  .then((data) => {
    console.log("POST response:", data);
    setSubmitted(true);
  })
  .catch((error) => {
    console.log("POST error:", error);
  });

        // console.log("Name:",name);
        // console.log("Email:",email);
        // console.log("Reason:",reason);

//   const application = {
//   jobId: job.id,
//   jobTitle: job.title,
//   company: job.company,
//   name: name,
//   email: email,
//   reason: reason,
// //   status: "Applied"
//    status:"under Review"
// };


// const existingApplications =
//   JSON.parse(localStorage.getItem("applications")) || [];

// existingApplications.push(application);

// localStorage.setItem(
//   "applications",
//   JSON.stringify(existingApplications)
// );
        setSubmitted(true);
    };

    if (!job) {
  return <p>Loading job details...</p>;
}

  return (
   <main className='application-page'>
    <form className='application-card' onSubmit={handleSubmit}>
    <h1>Job Application</h1>

    {job && (
  <p>
    Applying for: <strong>{job.title}</strong>
  </p>
)}

    <input
    type="text"
    placeholder="Full Name"
    value={name}
    onChange={(e)=>setName(e.target.value)}
    />

    <input 
    type="email"
    placeholder='Email'
    value={email}
    onChange={(e)=>setEmail(e.target.value)}
    />



    <textarea
     placeholder='Why are you interested in this job?'
    value={reason}
    onChange={(e) => setReason(e.target.value)}
    ></textarea>

    <button type="submit">Submit Application</button>
    </form>
    {submitted && (
        <p>Application submitted successfully! ✅</p>
    )}
   </main>
  )
}

export default Application
