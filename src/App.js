import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import TaskForm from './components/TaskForm';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/add-task" element={
              <ProtectedRoute>
                <TaskForm />
              </ProtectedRoute>
            } />
            <Route path="/edit-task" element={
              <ProtectedRoute>
                <TaskForm />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;
