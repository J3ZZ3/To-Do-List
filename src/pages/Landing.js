import React from 'react';
import { useSpring, animated } from 'react-spring';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  const backgroundAnimation = useSpring({
    from: { backgroundPosition: '0% 50%' },
    to: { backgroundPosition: '100% 50%' },
    config: { duration: 10000 },
    loop: { reverse: true },
  });

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
        <h1 style={styles.title}>Welcome To The To Do List</h1>
        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={() => navigate('/login')}>
            Login
          </button>
          <button style={styles.button} onClick={() => navigate('/register')}>
            Register
          </button>
        </div>
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
  buttonContainer: {
    display: 'flex',
    gap: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#6a11cb',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default Landing;
