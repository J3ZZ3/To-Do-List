import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('username, avatar_url')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      if (data) {
        setUsername(data.username || '');
        setAvatarUrl(data.avatar_url || '');
      }
    } catch (error) {
      console.error('Error loading user data:', error.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      getProfile();
    }
  }, [user, getProfile]);

  const updateProfile = async (e) => {
    e.preventDefault();
    
    try {
      const updates = {
        id: user.id,
        username,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('profiles')
        .upsert(updates);

      if (error) throw error;
      alert('Profile updated!');
    } catch (error) {
      alert('Error updating profile!');
    }
  };

  const handleAvatarUpload = async (event) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const updates = {
        id: user.id,
        avatar_url: data.publicUrl,
        updated_at: new Date().toISOString(),
      };

      const { error: updateError } = await supabase
        .from('profiles')
        .upsert(updates);

      if (updateError) throw updateError;
      
      setAvatarUrl(data.publicUrl);
    } catch (error) {
      alert('Error uploading avatar!');
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Profile</h2>
        <button onClick={() => navigate('/home')} className="back-button">
          <ion-icon name="arrow-back-outline"></ion-icon>
          Back
        </button>
      </div>

      <div className="profile-content">
        <div className="avatar-section">
          <div className="avatar-wrapper">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar" className="avatar" />
            ) : (
              <div className="avatar-placeholder">
                <ion-icon name="person-outline"></ion-icon>
              </div>
            )}
            <label className="avatar-upload-button">
              <ion-icon name="camera-outline"></ion-icon>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                disabled={loading}
              />
            </label>
          </div>
        </div>

        <form onSubmit={updateProfile} className="profile-form">
          <div className="form-group">
            <label>Email</label>
            <input type="text" value={user?.email} disabled />
          </div>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>

          <button type="submit" className="update-button" disabled={loading}>
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;