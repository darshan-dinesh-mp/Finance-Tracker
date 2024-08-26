import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/LoginSignup/Login';
import Signup from './components/LoginSignup/Signup';
import Home from './components/Home/Home';
import EditTransaction from './components/Transaction/EditTransaction';

function App() {
  const isAuthenticated = !!localStorage.getItem('userId');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/edit-transaction" element={<EditTransaction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
