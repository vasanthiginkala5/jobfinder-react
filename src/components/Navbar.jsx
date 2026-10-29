// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:8000/api/current-user/", {
//       credentials: "include"
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.logged_in) {
//           setUser(data);
//         } else {
//           setUser(null);
//         }
//       })
//       .catch((error) => {
//         console.log("User check error:", error);
//       });
//   }, []);

//   const handleLogout = () => {
//     fetch("http://localhost:8000/api/logout/", {
//       method: "POST",
//       credentials: "include"
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Logout response:", data);
//         setUser(null);
//       })
//       .catch((error) => {
//         console.log("Logout error:", error);
//       });
//   };

//   return (
//     <nav className="navbar">

//       <div className="navbar-logo">
//         <span>💼</span>
//         <h2>JOBFINDER</h2>
//       </div>

//       <div className="navbar-links">
//         <Link to="/">Home</Link>
//         <Link to="/jobs">Jobs</Link>
//         <Link to="/saved">Saved Jobs</Link>
//         <Link to="/applications">Applications</Link>
//         <Link to="/career-assistant">Career Assistant</Link>
//         <Link to="/resume-analyzer">Resume Analyzer</Link>
//         <Link to="/profile">Profile</Link>
//       </div>

//       <div className="navbar-profile">
//         <span>👤</span>

//         {user ? (
//           <>
//             <span>Welcome, {user.username}</span>

//             <button onClick={handleLogout}>
//               Logout
//             </button>
//           </>
//         ) : (
//           <Link to="/login">
//             Login
//           </Link>
//         )}
//       </div>

//     </nav>
//   );
// };

// export default Navbar;


import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const checkCurrentUser = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/current-user/",
        { credentials: "include" }
      );

      const data = await response.json();

      if (data.logged_in) {
        setUser(data);
        localStorage.setItem("isLoggedIn", "true");
      } else {
        setUser(null);
        localStorage.removeItem("isLoggedIn");
      }
    } catch (error) {
      console.error("User check error:", error);
    }
  };

  useEffect(() => {
    checkCurrentUser();
  }, []);

  const handleLogout = async () => {
    try {
      // Get CSRF token
      const csrfResponse = await fetch(
        "http://localhost:8000/api/csrf/",
        { credentials: "include" }
      );

      if (!csrfResponse.ok) {
        throw new Error("Could not get CSRF token.");
      }

      const csrfData = await csrfResponse.json();

      // Logout from Django
      const response = await fetch(
        "http://localhost:8000/api/logout/",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfData.csrfToken,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.detail || "Logout failed.");
      }

      // Clear login state and redirect
      setUser(null);
      localStorage.removeItem("isLoggedIn");

      console.log("Logout successful:", data);

      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

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
        <Link to="/career-assistant">Career Assistant</Link>
        <Link to="/resume-analyzer">Resume Analyzer</Link>
        <Link to="/profile">Profile</Link>
      </div>

      <div className="navbar-profile">
        <span>👤</span>

        {user ? (
          <>
            <span>Welcome, {user.username}</span>
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
