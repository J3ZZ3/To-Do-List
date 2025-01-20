import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../utils/auth'; // Ensure the path is correct
import './Login.css'; // Import the CSS for styling

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Create animation for the background
  const backgroundAnimation = useSpring({
    from: { backgroundPosition: '0% 50%' },
    to: { backgroundPosition: '100% 50%' },
    config: { duration: 10000 },
    loop: { reverse: true },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginUser(username, password)) {
      navigate("/home");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={styles.container}>
      {/* Animated background */}
      <animated.div
        style={{
          ...styles.background,
          backgroundImage:
            'linear-gradient(45deg, #ff9a9e, #fad0c4, #fbc2eb, #a18cd1)',
          ...backgroundAnimation,
        }}
      />
      {/* Content */}
      <div style={styles.content}>
        <h1 style={styles.title}>Login</h1>
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
          
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/Register" className="landing-link">Register here</Link>
        </p>
      </div>
    </div>
  );
};

// Styles
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
  formContainer: {
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
    background: 'rgba(255, 255, 255, 0.8)', // Set to a transparent white
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
};

export default Login;