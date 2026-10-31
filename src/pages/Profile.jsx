import React, { useState, useEffect  } from "react";

function Profile() {

    const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [skills, setSkills] = useState("");

const [saved, setSaved] = useState(false);
const [profileId, setProfileId] = useState(null);

useEffect(() => {
  fetch("https://jobfinder-react.onrender.com/api/profiles/", {
    credentials: "include"
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load profile");
      }
      return response.json();
    })
    .then((data) => {
      if (data.length > 0) {
        const profile = data[0];

        setProfileId(profile.id);
        setName(profile.name);
        setEmail(profile.email);
        setSkills(profile.skills);
      }
    })
    .catch((error) => {
      console.log("Profile loading error:", error);
    });
}, []);
// useEffect(() => {
//   const savedProfile = localStorage.getItem("profile");

//   if (savedProfile) {
//     const profile = JSON.parse(savedProfile);

//     setName(profile.name);
//     setEmail(profile.email);
//     setSkills(profile.skills);
//   }
// }, []);

// const handleSubmit = (e) => {
//   e.preventDefault();

//   const profile = {
//     name: name,
//     email: email,
//     skills: skills
//   };

//   localStorage.setItem(
//     "profile",
//     JSON.stringify(profile)
//   );

//   console.log("Profile saved:", profile);

//   setSaved(true);
// };
const handleSubmit = (e) => {
  e.preventDefault();

  const profile = {
    name: name,
    email: email,
    skills: skills
  };

  fetch("https://jobfinder-react.onrender.com/api/csrf/", {
    credentials: "include"
  })
    .then((response) => response.json())
    .then((csrfData) => {
      return fetch(
        profileId
? `https://jobfinder-react.onrender.com/api/profiles/${profileId}/`
: "https://jobfinder-react.onrender.com/api/profiles/",
        {
          method: profileId ? "PUT" : "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfData.csrfToken
          },
          body: JSON.stringify(profile)
        }
      );
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to save profile");
      }

      return response.json();
    })
    .then((data) => {
      console.log("Profile saved:", data);
      setProfileId(data.id);
      setSaved(true);
    })
    .catch((error) => {
      console.log("Profile save error:", error);
      setSaved(false);
    });
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