import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCameraRetro } from 'react-icons/fa';
import './BlogProfile.css'; // Import the CSS file

const DEFAULT_PROFILE_PHOTO = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'; // Default profile photo URL

const BlogProfile = () => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSaving, setIsSaving] = useState(false); // Track saving state

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('https://localhost:7030/api/User', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFileUpload = async () => {
    if (!imageFile) return;
    setIsSaving(true); // Start saving state

    const token = localStorage.getItem('accessToken');
    const formData = new FormData();
    formData.append('file', imageFile);

    try {
      const response = await axios.put('https://localhost:7030/api/UserProfile/UploadProfilePhoto', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      // Update the profile photo in the user state
      setUser((prevUser) => ({
        ...prevUser,
        profilePhoto: `${response.data.fileUri}?timestamp=${new Date().getTime()}`, // Cache busting with timestamp
      }));

      setImageFile(null);
      setImagePreview(null);
      toggleModal();
    } catch (error) {
      console.error('Error uploading photo:', error);
    } finally {
      setIsSaving(false); // End saving state
    }
  };

  const profilePhoto = user.profilePhoto || DEFAULT_PROFILE_PHOTO; // Use default photo if none

  return (
    <div className="blogprofile-container">
      <img
        src={profilePhoto}
        alt="Profile"
        className="blogprofile-profileImage"
        onClick={toggleModal}
      />
      <div className="blogprofile-textContainer">
        <h2 className="blogprofile-username">{user.username}</h2>
      </div>

      {isModalOpen && (
        <div className="blogprofile-modal">
          <div className="blogprofile-modalContent">
            <div className="blogprofile-label">Profile Photo</div>
            <img
              src={imagePreview || profilePhoto}
              alt="Expanded Profile"
              className="blogprofile-expandedImage"
            />
            {!imageFile && (
              <button
                className="blogprofile-addPhotoButton"
                onClick={() => document.getElementById('fileInput').click()}
              >
                <FaCameraRetro /> Add Photo
              </button>
            )}
            <input
              id="fileInput"
              type="file"
              className="blogprofile-fileInput"
              onChange={handleFileChange}
              accept="image/*"
            />
            {imageFile && (
              <div className="blogprofile-buttonContainer">
                <button
                  className={isSaving ? 'blogprofile-savingButton' : 'blogprofile-uploadButton'}
                  onClick={handleFileUpload}
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save'}
                </button>
                <button
                  className="blogprofile-cancelButton"
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          <div className="blogprofile-modalOverlay" onClick={toggleModal}></div>
        </div>
      )}
    </div>
  );
};

export default BlogProfile;
