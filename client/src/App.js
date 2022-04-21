import React, { Component } from 'react';
import { Route, Routes } from "react-router-dom";
import Header from './components/header';
// import Search from './components/search';
import Footer from './components/footer';
import Home from './components/home';
import Tutors from './components/tutors';
import Tutor from './components/tutor';
import Appointments from './components/appointments';
import Appointment from './components/appointment';

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
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

export default App;