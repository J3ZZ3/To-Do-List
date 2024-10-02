import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const [newUsername, setNewUsername] = useState(user.username || '');
  const [profilePicture, setProfilePicture] = useState(user.profilePicture || '');

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
    <div className="profile-container">
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
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
        <Link to="/home" className="back-link">Back to Home</Link>
      </div>
    </div>
  );
};

export default Profile;
