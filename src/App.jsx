import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Jobs from './pages/Jobs';
import {BrowserRouter, Routes,Route} from "react-router-dom";
import JobDetails from './pages/JobDetails';
import Application from './pages/Application';
import Applications from "./pages/Applications";
import SavedJobs from './pages/SavedJobs';
import Profile from './pages/Profile';
import Login from "./pages/Login";
import CareerAssistant from "./CareerAssistant";
import ResumeAnalyzer from "./ResumeAnalyzer";
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  return (
  <BrowserRouter>
  <Navbar/>
  <Routes>
    <Route path="/" element={<Home/>}/>


    <Route path="/jobs" element={<Jobs />}/>

    <Route path="/jobs/:id" element={<JobDetails/>}/>

    <Route path="/applications/apply" element={<Application/>}/>

    <Route
  path="/applications"
  element={
    <ProtectedRoute>
      <Applications />
    </ProtectedRoute>
  }
/>

<Route
  path="/saved"
  element={
    <ProtectedRoute>
      <SavedJobs />
    </ProtectedRoute>
  }
/>

<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

    <Route path="/login" element={<Login />} />

    <Route
  path="/career-assistant"
  element={<CareerAssistant />}
/>

    <Route
  path="/resume-analyzer"
  element={<ResumeAnalyzer />}
/>
  </Routes>

  </BrowserRouter>
  
  );
}

export default App
