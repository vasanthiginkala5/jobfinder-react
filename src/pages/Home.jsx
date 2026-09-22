import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [searchTerm, setSearchTerm] = useState("");
const navigate = useNavigate();

  return (
    <main>
        <section className="hero">
            <h1>Find Your Next opportunity</h1>
            <p>
                Discover jobs that match your skills, experience, and career goals.
            </p>
            <div className="search-box">

                <input type="text" placeholder="Job title or keyword"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />

                <input
                type="text"
                placeholder="location"/>

                <button onClick={()=> navigate(`/jobs?search=${searchTerm}`)}>Search</button>

            </div>
        </section>
        </main>
  )
}

export default Home
