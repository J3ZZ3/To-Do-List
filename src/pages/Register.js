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
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validatePassword(password)) {
      setPasswordError('Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      setLoading(false);
      return;
    }

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
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError('');
          }}
          required
          minLength="8"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setPasswordError('');
          }}
          required
        />
        {passwordError && <p className="error-message">{passwordError}</p>}
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