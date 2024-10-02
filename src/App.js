import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Profile from './pages/Profile';


const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Landing />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path='/Profile' element={<Profile />} />

      </Routes>
    </Router>
  );
};

export default App;