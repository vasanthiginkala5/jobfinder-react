
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/current-user/",
          {
            credentials: "include"
          }
        );

        if (!response.ok) {
          setIsLoggedIn(false);
          localStorage.removeItem("isLoggedIn");
          return;
        }

        const data = await response.json();

        if (data.logged_in) {
          setIsLoggedIn(true);
          localStorage.setItem("isLoggedIn", "true");
        } else {
          setIsLoggedIn(false);
          localStorage.removeItem("isLoggedIn");
        }
      } catch (error) {
        console.error("Login verification failed:", error);
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn");
      }
    };

    checkLogin();
  }, []);

  if (isLoggedIn === null) {
    return <p>Checking login...</p>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
