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

const App = () => {
  return (
  <BrowserRouter>
  <Navbar/>
  <Routes>
    <Route path="/" element={<Home/>}/>


    <Route path="/jobs" element={<Jobs />}/>

    <Route path="/jobs/:id" element={<JobDetails/>}/>

    <Route path="/applications/apply" element={<Application/>}/>

    <Route path="/applications" element={<Applications/>} />

    <Route path="/saved" element={<SavedJobs/>}/>
     
    <Route path="/saved" element={<SavedJobs />} />

    <Route path="/profile" element={<Profile />} />

  </Routes>

  </BrowserRouter>
  
  );
}

export default App
