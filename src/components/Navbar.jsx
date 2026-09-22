import React from 'react'
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className="navbar">

      <div className="navbar-logo">
             <span>💼</span>
        <h2>JOBFINDER</h2>
             </div>
        <div className="navbar-links">
            <Link to="/">Home</Link>
            <Link to="/jobs">Jobs</Link>
            <Link to="/saved">Saved Jobs</Link>
            <Link to="/applications">Applications</Link>
        </div>
        <div className='navbar-profile'>
             <span>👤</span>
        <a href="/profile">Profile</a>
        </div>

    </nav>
  );
}

export default Navbar;
