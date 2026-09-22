import React, { useState, useEffect  } from "react";

function Profile() {

    const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [skills, setSkills] = useState("");

const [saved, setSaved] = useState(false);

useEffect(() => {
  const savedProfile = localStorage.getItem("profile");

  if (savedProfile) {
    const profile = JSON.parse(savedProfile);

    setName(profile.name);
    setEmail(profile.email);
    setSkills(profile.skills);
  }
}, []);

const handleSubmit = (e) => {
  e.preventDefault();

  const profile = {
    name: name,
    email: email,
    skills: skills
  };

  localStorage.setItem(
    "profile",
    JSON.stringify(profile)
  );

  console.log("Profile saved:", profile);

  setSaved(true);
};

  return (
  <main className="profile-page">
    <h1>My Profile</h1>

    <form className="profile-form" onSubmit={handleSubmit}>
       
       <input
  type="text"
  placeholder="Full Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

      <input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
      
    <textarea
  placeholder="Skills"
  value={skills}
  onChange={(e) => setSkills(e.target.value)}
></textarea>

      <button type="submit">
        Save Profile
      </button>

      {saved && (
  <p>Profile saved successfully! ✅</p>
)}
    </form>
  </main>
);
}
export default Profile;