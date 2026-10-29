import React, { useState, useEffect } from "react";

function Applications()
 {
     
  const [applications, setApplications] = useState([]);
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
  console.log("Fetching applications...");

  fetch("http://localhost:8000/api/applications/", {
    credentials: "include"
  })
    .then((response) => {
      console.log("GET status:", response.status);
      return response.json();
    })
    .then((data) => {
      console.log("Applications received:", data);
      setApplications(data);
    })
    .catch((error) => {
      console.log("GET error:", error);
    });
}, []);

  const removeApplication = (id) => {
  fetch(`http://localhost:8000/api/applications/${id}/`, {
  method: "DELETE",
  credentials: "include",
  headers: {
    "X-CSRFToken": csrfToken
  }
})
    .then((response) => {
      console.log("Delete status:", response.status);

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      // const updatedApplications = applications.filter(
      //   (application) => application.id !== id
      // );

      // setApplications(updatedApplications);

      setApplications((currentApplications) =>
  currentApplications.filter(
    (application) => application.id !== id
  )
);
    })
    .catch((error) => {
      console.log("Delete error:", error);
    });
};
  return (
    <main className="applications-page">
      <h1>My Applications</h1>

      {applications.length > 0 ? (
        <div className="application-list">
          {applications.map((application) => (
            <div className="application-item" key={application.id}>
              <h2>{application.job}</h2>

              <p>
                Name: {application.name}
              </p>

              <p>
                Email: {application.email}
              </p>

              <p>
                Reason: {application.reason}
              </p>

              <p>
                Status: {application.status}
              </p>

              <button
                onClick={() => removeApplication(application.id)}
              >
                Remove Application
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No applications yet.</p>
      )}
    </main>
  );
}

export default Applications;