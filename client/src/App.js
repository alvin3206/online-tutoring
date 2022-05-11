import React, { Component } from 'react';
import { Route, Routes } from "react-router-dom";
import Header from './components/header';
// import Search from './components/search';
import Footer from './components/footer';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import Tutors from './components/tutors';
import Tutor from './components/tutor';
import Appointments from './components/appointments';
import Appointment from './components/appointment';
// import Cookies from 'js-cookie';

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tutors" element={<Tutors />} />
        <Route path="/tutors/:tutorId" element={<Tutor />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/appointments/:appointmentId" element={<Appointment />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
};

// function Logout() {
//   Cookies.remove("token");
//   Cookies.remove("cred_id");
//   Cookies.remove("cat");
// }

export default App;