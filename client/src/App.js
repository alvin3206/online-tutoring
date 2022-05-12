import React, { Component, useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import Header from './components/header';
// import Search from './components/search';
import Footer from './components/footer';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import Profile from './components/profile';
import Tutors from './components/tutors';
import Tutor from './components/tutor';
import Appointments from './components/appointments';
import Appointment from './components/appointment';
// import Cookies from 'js-cookie';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [note, setNote] = useState("");
  const [noteType, setNoteType] = useState("success");
  useEffect(() => {
    if (note !== "") {
      toast.info(note, {
        onOpen: () => setNote(""),
      })
    }
  }, [note]);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register setNote={setNote} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tutors" element={<Tutors />} />
        <Route path="/tutors/:tutorId" element={<Tutor setNote={setNote} />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/appointments/:appointmentId" element={<Appointment />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored">
      </ToastContainer>
    </div>
  );
};

// function Logout() {
//   Cookies.remove("token");
//   Cookies.remove("cred_id");
//   Cookies.remove("cat");
// }

export default App;