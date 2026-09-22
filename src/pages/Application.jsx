import React from 'react'
import {useState} from "react";
import {useSearchParams} from "react-router-dom";
import Jobs from '../data/Jobs';

const Application = () => {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [reason,setReason]=useState("");
    const [submitted,setSubmitted]=useState(false);

    const [searchParams] = useSearchParams();
    const jobId = searchParams.get("job");

    console.log("Job ID:",jobId)
    const job = Jobs.find((job) => job.id === Number(jobId));
    


    const handleSubmit=(e)=>{
        e.preventDefault();

        console.log("Name:",name);
        console.log("Email:",email);
        console.log("Reason:",reason);

  const application = {
  jobId: job.id,
  jobTitle: job.title,
  company: job.company,
  name: name,
  email: email,
  reason: reason,
//   status: "Applied"
   status:"under Review"
};


const existingApplications =
  JSON.parse(localStorage.getItem("applications")) || [];

existingApplications.push(application);

localStorage.setItem(
  "applications",
  JSON.stringify(existingApplications)
);
        setSubmitted(true);
    };

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
