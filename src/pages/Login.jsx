// // // import React, { useState } from "react";

// // // function Login() {
// // //   const [username, setUsername] = useState("");
// // //   const [password, setPassword] = useState("");
// // //   const [message, setMessage] = useState("");
// // //   const [loggedInUser, setLoggedInUser] = useState("");
// // //   const [loginStatus, setLoginStatus] = useState("");

// // //   const handleSubmit = (e) => {
// // //     e.preventDefault();

// // //     fetch("http://localhost:8000/api/login/", {
// // //       method: "POST",
// // //       credentials: "include",
// // //       headers: {
// // //         "Content-Type": "application/json"
// // //       },
// // //       body: JSON.stringify({
// // //         username: username,
// // //         password: password
// // //       })
// // //     })
// // //       .then((response) => response.json())
// // //       .then((data) => {
// // //         console.log("Login response:", data);

// // //         setMessage(data.message);

// // //         if (data.username) {
// // //           setLoggedInUser(data.username);
// // //           setLoginStatus("Logged in successfully");
// // //         }
// // //       })
// // //       .catch((error) => {
// // //         console.log("Login error:", error);
// // //         setMessage("Login failed");
// // //       });
// // //   };

// // //   const checkLogin = () => {
// // //     fetch("http://localhost:8000/api/current-user/", {
// // //       credentials: "include"
// // //     })
// // //       .then((response) => response.json())
// // //       .then((data) => {
// // //         console.log("Current user:", data);

// // //         if (data.logged_in) {
// // //           setLoggedInUser(data.username);

// // //           setLoginStatus(
// // //             `Logged in as: ${data.username} (User ID: ${data.user_id})`
// // //           );
// // //         } else {
// // //           setLoggedInUser("");
// // //           setLoginStatus("Not logged in");
// // //         }
// // //       })
// // //       .catch((error) => {
// // //         console.log("Check login error:", error);
// // //         setLoginStatus("Error checking login");
// // //       });
// // //   };

// // //   const handleLogout = () => {
// // //     fetch("http://localhost:8000/api/logout/", {
// // //       method: "POST",
// // //       credentials: "include"
// // //     })
// // //       .then((response) => response.json())
// // //       .then((data) => {
// // //         console.log("Logout response:", data);

// // //         setMessage(data.message);
// // //         setLoggedInUser("");
// // //         setLoginStatus("Not logged in");
// // //         setPassword("");
// // //       })
// // //       .catch((error) => {
// // //         console.log("Logout error:", error);
// // //         setMessage("Logout failed");
// // //       });
// // //   };

// // //   return (
// // //     <main className="login-page">
// // //       <h1>Login</h1>

// // //       <form onSubmit={handleSubmit} className="login-form">

// // //         <input
// // //           type="text"
// // //           placeholder="Username"
// // //           value={username}
// // //           onChange={(e) => setUsername(e.target.value)}
// // //         />

// // //         <input
// // //           type="password"
// // //           placeholder="Password"
// // //           value={password}
// // //           onChange={(e) => setPassword(e.target.value)}
// // //         />

// // //         <button type="submit">
// // //           Login
// // //         </button>

// // //         <button type="button" onClick={checkLogin}>
// // //           Check Login
// // //         </button>

// // //         <button type="button" onClick={handleLogout}>
// // //           Logout
// // //         </button>

// // //       </form>

// // //       {message && (
// // //         <p>{message}</p>
// // //       )}

// // //       {loggedInUser && (
// // //         <p>Welcome, {loggedInUser}</p>
// // //       )}

// // //       {loginStatus && (
// // //         <p>{loginStatus}</p>
// // //       )}

// // //     </main>
// // //   );
// // // }

// // // export default Login;
// // import React, { useState } from "react";

// // function Login() {
// //   const [username, setUsername] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [message, setMessage] = useState("");
// //   const [loggedInUser, setLoggedInUser] = useState("");
// //   const [loginStatus, setLoginStatus] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setMessage("");

// //     if (!username.trim() || !password) {
// //       setMessage("Please enter both username and password.");
// //       return;
// //     }

// //     setLoading(true);

// //     try {
// //       const response = await fetch("http://localhost:8000/api/login/", {
// //         method: "POST",
// //         credentials: "include",
// //         headers: {
// //           "Content-Type": "application/json"
// //         },
// //         body: JSON.stringify({
// //           username: username.trim(),
// //           password: password
// //         })
// //       });

// //       const data = await response.json();

// //       if (!response.ok) {
// //         setMessage(data.message || data.detail || "Invalid username or password.");
// //         return;
// //       }

// //       setMessage(data.message || "Login successful.");

// //       if (data.username) {
// //   localStorage.setItem("isLoggedIn", "true");

// //   setLoggedInUser(data.username);
// //   setLoginStatus("Logged in successfully");
// // }
// //     } catch (error) {
// //       console.log("Login error:", error);
// //       setMessage("Unable to connect to the server. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const checkLogin = async () => {
// //     try {
// //       const response = await fetch(
// //         "http://localhost:8000/api/current-user/",
// //         { credentials: "include" }
// //       );

// //       if (!response.ok) {
// //         throw new Error("Unable to check login status.");
// //       }

// //       const data = await response.json();

// //       if (data.logged_in) {
// //         setLoggedInUser(data.username);
// //         setLoginStatus(
// //           `Logged in as: ${data.username} (User ID: ${data.user_id})`
// //         );
// //       } else {
// //         setLoggedInUser("");
// //         setLoginStatus("Not logged in");
// //       }
// //     } catch (error) {
// //       console.log("Check login error:", error);
// //       setLoginStatus("Error checking login. Please try again.");
// //     }
// //   };

// //   const handleLogout = async () => {
// //     try {
// //       // const response = await fetch("http://localhost:8000/api/logout/", {
// //       //   method: "POST",
// //       //   credentials: "include"
// //       // });
      
// // const handleLogout = async () => {
// //   try {
// //     // Step 1: Get the CSRF token from Django
// //     const csrfResponse = await fetch(
// //       "http://localhost:8000/api/csrf/",
// //       {
// //         credentials: "include"
// //       }
// //     );

// //     if (!csrfResponse.ok) {
// //       throw new Error("Could not get CSRF token.");
// //     }

// //     const csrfData = await csrfResponse.json();

// //     // Step 2: Send the CSRF token with the logout request
// //     const response = await fetch(
// //       "http://localhost:8000/api/logout/",
// //       {
// //         method: "POST",
// //         credentials: "include",
// //         headers: {
// //           "X-CSRFToken": csrfData.csrfToken
// //         }
// //       }
// //     );

// //     const data = await response.json();

// //     if (!response.ok) {
// //       throw new Error(data.message || "Logout failed.");
// //     }

// //     // Step 3: Update the frontend after successful logout
// //     localStorage.removeItem("isLoggedIn");
// //     setMessage(data.message || "Logout successful");
// //     setLoggedInUser("");
// //     setLoginStatus("Not logged in");
// //     setPassword("");
// //   } catch (error) {
// //     console.log("Logout error:", error);
// //     setMessage(error.message || "Logout failed. Please try again.");
// //   }
// // };


// //       const data = await response.json();

// //       if (!response.ok) {
// //         throw new Error(data.message || "Logout failed.");
// //       }

// //       setMessage(data.message || "Logged out successfully.");
// //       localStorage.removeItem("isLoggedIn");
// //       setLoggedInUser("");
// //       setLoginStatus("Not logged in");
// //       setPassword("");
// //     } catch (error) {
// //       console.log("Logout error:", error);
// //       setMessage(error.message || "Logout failed. Please try again.");
// //     }
// //   };

// //   return (
// //     <main className="login-page">
// //       <h1>Login</h1>

// //       <form onSubmit={handleSubmit} className="login-form">
// //         <input
// //           type="text"
// //           placeholder="Username"
// //           value={username}
// //           onChange={(e) => setUsername(e.target.value)}
// //           autoComplete="username"
// //           required
// //         />

// //         <input
// //           type="password"
// //           placeholder="Password"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //           autoComplete="current-password"
// //           required
// //         />

// //         <button type="submit" disabled={loading}>
// //           {loading ? "Logging in..." : "Login"}
// //         </button>

// //         <button type="button" onClick={checkLogin}>
// //           Check Login
// //         </button>

// //         <button type="button" onClick={handleLogout}>
// //           Logout
// //         </button>
// //       </form>

// //       {message && <p role="status">{message}</p>}

// //       {loggedInUser && <p>Welcome, {loggedInUser}</p>}

// //       {loginStatus && <p>{loginStatus}</p>}
// //     </main>
// //   );
// // }

// // export default Login;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [loggedInUser, setLoggedInUser] = useState("");
//   const [loginStatus, setLoginStatus] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     if (!username.trim() || !password) {
//       setMessage("Please enter both username and password.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch("http://localhost:8000/api/login/", {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           username: username.trim(),
//           password: password
//         })
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setMessage(
//           data.message || data.detail || "Invalid username or password."
//         );
//         return;
//       }

//       setMessage(data.message || "Login successful.");

//       if (data.username) {
//   localStorage.setItem("isLoggedIn", "true");
//   setLoggedInUser(data.username);
//   setLoginStatus("Logged in successfully");

//   navigate("/jobs");
// }
//     } catch (error) {
//       console.log("Login error:", error);
//       setMessage("Unable to connect to the server. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const checkLogin = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:8000/api/current-user/",
//         { credentials: "include" }
//       );

//       if (!response.ok) {
//         throw new Error("Unable to check login status.");
//       }

//       const data = await response.json();

//       if (data.logged_in) {
//         localStorage.setItem("isLoggedIn", "true");
//         setLoggedInUser(data.username);
//         setLoginStatus(
//           `Logged in as: ${data.username} (User ID: ${data.user_id})`
//         );
//       } else {
//         localStorage.removeItem("isLoggedIn");
//         setLoggedInUser("");
//         setLoginStatus("Not logged in");
//       }
//     } catch (error) {
//       console.log("Check login error:", error);
//       setLoginStatus("Error checking login. Please try again.");
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       const csrfResponse = await fetch(
//         "http://localhost:8000/api/csrf/",
//         { credentials: "include" }
//       );

//       if (!csrfResponse.ok) {
//         throw new Error("Could not get CSRF token.");
//       }

//       const csrfData = await csrfResponse.json();

//       const response = await fetch(
//         "http://localhost:8000/api/logout/",
//         {
//           method: "POST",
//           credentials: "include",
//           headers: {
//             "X-CSRFToken": csrfData.csrfToken
//           }
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Logout failed.");
//       }
// localStorage.removeItem("isLoggedIn");
// setMessage(data.message || "Logout successful.");
// setLoggedInUser("");
// setLoginStatus("Not logged in");
// setPassword("");

// window.location.replace("/login");
//     } catch (error) {
//       console.log("Logout error:", error);
//       setMessage(error.message || "Logout failed. Please try again.");
//     }
//   };

//   return (
//     <main className="login-page">
//       <h1>Login</h1>

//       <form onSubmit={handleSubmit} className="login-form">
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           autoComplete="username"
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           autoComplete="current-password"
//           required
//         />

//         <button type="submit" disabled={loading}>
//           {loading ? "Logging in..." : "Login"}
//         </button>

//         <button type="button" onClick={checkLogin}>
//           Check Login
//         </button>

//         <button type="button" onClick={handleLogout}>
//           Logout
//         </button>
//       </form>

//       {message && <p role="status">{message}</p>}
//       {loggedInUser && <p>Welcome, {loggedInUser}</p>}
//       {loginStatus && <p>{loginStatus}</p>}
//     </main>
//   );
// }

// export default Login;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loggedInUser, setLoggedInUser] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!username.trim() || !password) {
      setMessage("Please enter both username and password.");
      return;
    }

    setLoading(true);

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

      // Send login request
      const response = await fetch(
        "http://localhost:8000/api/login/",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfData.csrfToken,
          },
          body: JSON.stringify({
            username: username.trim(),
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message || data.detail || "Invalid username or password."
        );
        return;
      }

      if (data.username) {
        localStorage.setItem("isLoggedIn", "true");
        setLoggedInUser(data.username);
        setLoginStatus("Logged in successfully");
        setMessage("Login successful");

        navigate("/jobs", { replace: true });
      } else {
        setMessage("Login response did not contain a username.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage(error.message || "Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  // CHECK LOGIN
  const checkLogin = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/current-user/",
        { credentials: "include" }
      );

      if (!response.ok) {
        throw new Error("Unable to check login status.");
      }

      const data = await response.json();

      if (data.logged_in) {
        localStorage.setItem("isLoggedIn", "true");
        setLoggedInUser(data.username);
        setLoginStatus(`Logged in as: ${data.username}`);
      } else {
        localStorage.removeItem("isLoggedIn");
        setLoggedInUser("");
        setLoginStatus("Not logged in");
      }
    } catch (error) {
      console.error("Check login error:", error);
      setLoginStatus(error.message);
    }
  };

  // LOGOUT
  const handleLogout = async () => {
    console.log("Logout button clicked");
    setMessage("");

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

      // Send logout request
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
        throw new Error(
          data.message || data.detail || "Logout failed."
        );
      }

      // Clear login state
      localStorage.removeItem("isLoggedIn");
      setLoggedInUser("");
      setLoginStatus("Not logged in");
      setPassword("");
      setMessage("Logout successful");

      console.log("Logout completed. Navigating to login...");

      // Navigate to login page
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
      setMessage(error.message || "Logout failed. Please try again.");
    }
  };

  return (
    <main className="login-page">
      <h1>Login</h1>

      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <button type="button" onClick={checkLogin}>
          Check Login
        </button>

        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </form>

      {message && <p role="status">{message}</p>}

      {loggedInUser && <p>Welcome, {loggedInUser}</p>}

      {loginStatus && <p>{loginStatus}</p>}
    </main>
  );
}

export default Login;
