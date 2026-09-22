import React from 'react'
import { useSearchParams } from 'react-router-dom';
import jobs from '../data/Jobs'
import JobCard from '../components/JobCard';
import {useState} from 'react';


function Jobs() {

    const [searchParams] = useSearchParams();

const initialSearch = searchParams.get("search") || "";


    const [searchTerm,setSearchTerm]=useState(initialSearch);

    const [location, setLocation] = useState("");
    
    const [jobType, setJobType] = useState("");
const filteredJobs = jobs.filter((job) =>
  job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
  (location === "" || job.location === location) &&
  (jobType === "" || job.type === jobType)
);

    return (
    <main>
        <h1>Available Jobs</h1>

        <input
        type="text"
        placeholder="search jobs..."
        value={searchTerm}
        onChange={(e)=>setSearchTerm(e.target.value)}
        />

        <select
  value={location}
  onChange={(e) => setLocation(e.target.value)}
>
  <option value="">All Locations</option>
  <option value="Bengaluru">Bengaluru</option>
  <option value="Hyderabad">Hyderabad</option>
  <option value="Pune">Pune</option>
</select>

<select
  value={jobType}
  onChange={(e) => setJobType(e.target.value)}
>
  <option value="">All Job Types</option>
  <option value="Full Time">Full Time</option>
  <option value="Part Time">Part Time</option>
  <option value="Internship">Internship</option>
</select>

<button
  onClick={() => {
    setSearchTerm("");
    setLocation("");
    setJobType("");
  }}
>
  Clear Filters
</button>


        <div className="jobs-container">
            {filteredJobs.length > 0 ? (
             filteredJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))
    ):(
        <p>No Job Cards.</p>
    )}
        
      </div>
    </main>
  )
}

export default Jobs;
