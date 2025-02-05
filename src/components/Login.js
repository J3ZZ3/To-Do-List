import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/auth';
import { useAlert } from '../hooks/useAlert';
import Spinner from './Spinner';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const { showAlert, AlertComponent } = useAlert();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await loginUser(email, password);
      showAlert({
        type: 'success',
        title: 'Success!',
        message: 'Login successful',
        duration: 1500
      });
      setTimeout(() => navigate('/home'), 1500);
    } catch (error) {
      showAlert({
        type: 'error',
        title: 'Error',
        message: error.message || 'Failed to login',
        showConfirmButton: true
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {loading && <Spinner text="Logging in..." />}
      {AlertComponent}
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <p>
          Don't have an account? 
          <span onClick={() => navigate('/register')} className="auth-link">
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login; 