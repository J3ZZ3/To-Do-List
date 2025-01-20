import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const [newUsername, setNewUsername] = useState(user.username || '');
  const [profilePicture, setProfilePicture] = useState(user.profilePicture || '');
  const navigate = useNavigate();

  const backgroundAnimation = useSpring({
    from: { backgroundPosition: '0% 50%' },
    to: { backgroundPosition: '100% 50%' },
    config: { duration: 10000 },
    loop: { reverse: true },
  });

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
        const updatedUser = { ...user, profilePicture: reader.result, username: newUsername };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, username: newUsername };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
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
        <h1 style={styles.title}>Profile</h1>
        <form onSubmit={handleSubmit} className="form-container">
          <div>
            <label>
              Username:
              <input type="text" value={newUsername} onChange={handleUsernameChange} />
            </label>
          </div>
          <div>
            <label>
              Upload Profile Picture:
              <input type="file" accept="image/*" onChange={handlePictureChange} />
            </label>
          </div>
          <div>
            <button type="submit">Update Profile</button>
          </div>
        </form>
        <div>
          <h2>Current Profile</h2>
          <p>Username: {user.username}</p>
          {profilePicture && (
            <img src={profilePicture} alt="Profile" className="profile-picture" />
          )}
        </div>
        <div>
          <button onClick={() => navigate('/home')}>Back to Home</button>
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
};

export default Profile;