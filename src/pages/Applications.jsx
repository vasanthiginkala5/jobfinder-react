import React,{useState, useEffect} from "react";

function Applications() {
  
    const savedApplications = localStorage.getItem("applications");

const initialApplications = savedApplications
  ? JSON.parse(savedApplications)
  : [];

const [applications, setApplications] = useState(initialApplications);

useEffect(() => {
  console.log("Applications page loaded");
}, []);

useEffect(() => {
  localStorage.setItem(
    "applications",
    JSON.stringify(applications)
  );
}, [applications]);

 const removeApplication = (index) => {
  const updatedApplications = applications.filter(
    (_, i) => i !== index
  );

  setApplications(updatedApplications);
};

  return (
    <main className="applications-page">
      <h1>My Applications</h1>

      {applications.length > 0 ? (
        <div className="application-list">
  {applications.map((application, index) => (
    <div className="application-item" key={index}>
      <h2>{application.jobTitle}</h2>
      <p>Company: {application.company}</p>
      <p>Name: {application.name}</p>
      <p>Email: {application.email}</p>
      <p>Reason: {application.reason}</p>
      <p>Status: {application.status || "Applied"}</p>
      <button onClick={() => removeApplication(index)}>
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