import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/LoginSignup/Login';
import Signup from './components/LoginSignup/Signup';
// import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Home/Home';

function App() {
  const isAuthenticated = !!localStorage.getItem('userId');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
