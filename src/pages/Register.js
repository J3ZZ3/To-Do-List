import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../utils/auth';
import { useAlert } from '../hooks/useAlert';
import Spinner from '../components/Spinner';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const { showAlert, AlertComponent } = useAlert();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { message } = await registerUser(email, password);
      showAlert({
        type: 'success',
        title: 'Registration Successful',
        message: message,
        showConfirmButton: true,
        confirmText: 'Go to Login',
        onConfirm: () => navigate('/login')
      });
    } catch (error) {
      showAlert({
        type: 'error',
        title: 'Registration Failed',
        message: error.message,
        showConfirmButton: true
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {loading && <Spinner text="Creating your account..." />}
      {AlertComponent}
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
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
          minLength="6"
        />
        <button type="submit">Register</button>
        <p>
          Already have an account? 
          <span onClick={() => navigate('/login')} className="auth-link">
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register; 