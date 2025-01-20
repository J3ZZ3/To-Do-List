import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../utils/auth';
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const backgroundAnimation = useSpring({
    from: { backgroundPosition: '0% 50%' },
    to: { backgroundPosition: '100% 50%' },
    config: { duration: 10000 },
    loop: { reverse: true },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(username, password);
    navigate('/Login');
  };

  return (
    <div style={styles.container}>
      <animated.div
        style={{
          ...styles.background,
          backgroundImage:
            'linear-gradient(45deg, #ff9a9e, #fad0c4, #fbc2eb, #a18cd1)',
          ...backgroundAnimation,
        }}
      />
      <div style={styles.content}>
        <h1 style={styles.title}>Register</h1>
        <form onSubmit={handleSubmit} className="form-container">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/Login" className="landing-link">Login here</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundSize: '200% 200%',
    zIndex: 1,
  },
  content: {
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
    color: '#fff',
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
};

export default Register;