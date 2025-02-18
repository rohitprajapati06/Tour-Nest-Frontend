import React, { useState } from 'react';
import './ProfileManagement.css'; 
import { FaCamera, FaEnvelope, FaKey, FaUserEdit, FaBookmark } from 'react-icons/fa';
import BlogProfile from '../../Blogging/BlogProfile';
import UpdateUsername from './UpdateUsername';
import UpdateEmail from './UpdateEmail';
import UpdatePassword from './UpdatePassword';
import BookingList from '../../Flights/Flight Booking/BookingList';

function ProfileManagement() {
  const [activeTab, setActiveTab] = useState('EditUsername');

  const openTab = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="prolific-profile-management-container">
      <div className="prolific-profile-management-user">
        {/* Tab navigation */}
        <div className="prolific-profile-management-user-tab">
          <button
            className={`prolific-profile-management-user-tablinks ${activeTab === 'EditUsername' ? 'active' : ''}`}
            onClick={() => openTab('EditUsername')}
          >
            <FaUserEdit /> Edit Username
          </button>
          <button
            className={`prolific-profile-management-user-tablinks ${activeTab === 'AddProfilePhoto' ? 'active' : ''}`}
            onClick={() => openTab('AddProfilePhoto')}
          >
            <FaCamera /> Add Profile Photo
          </button>
          <button
            className={`prolific-profile-management-user-tablinks ${activeTab === 'UpdateEmail' ? 'active' : ''}`}
            onClick={() => openTab('UpdateEmail')}
          >
            <FaEnvelope /> Update Email
          </button>
          <button
            className={`prolific-profile-management-user-tablinks ${activeTab === 'UpdatePassword' ? 'active' : ''}`}
            onClick={() => openTab('UpdatePassword')}
          >
            <FaKey /> Update Password
          </button>
          {/* New button for My Booking */}
          <button
            className={`prolific-profile-management-user-tablinks ${activeTab === 'MyBooking' ? 'active' : ''}`}
            onClick={() => openTab('MyBooking')}
          >
            <FaBookmark /> My Bookings
          </button>
        </div>

        {/* Tab contents */}
        <div
          className="prolific-profile-management-user-tabcontent"
          style={{ display: activeTab === 'EditUsername' ? 'block' : 'none' }}
        >
          <h3>Edit Username <FaUserEdit /></h3>
          <p>Give your online presence a fresh new look by updating your name!</p>
          <UpdateUsername />
        </div>

        <div
          className="prolific-profile-management-user-tabcontent"
          style={{
            display: activeTab === 'AddProfilePhoto' ? 'block' : 'none',
            textAlign: 'center',
            padding: '20px',
          }}
        >
          <h3>
            Add Profile Photo <FaCamera />
          </h3>
          <p>
            Your profile photo is more than just a picture - it's a representation of who you are and what you're about.
            <br /> By updating your profile photo, you can showcase your authentic self.
            <br /> So why wait? Upload a new profile photo today and start building meaningful connections!
          </p>
          <br />
          <q>Update your profile by clicking on it!</q>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <BlogProfile />
          </div>
        </div>

        <div
          className="prolific-profile-management-user-tabcontent"
          style={{ display: activeTab === 'UpdateEmail' ? 'block' : 'none' }}
        >
          <h3>Update Email <FaEnvelope /></h3>
          <p>Update your email address to ensure you receive important notifications and stay connected with us.</p>
          <UpdateEmail />
        </div>

        <div
          className="prolific-profile-management-user-tabcontent"
          style={{
            display: activeTab === 'UpdatePassword' ? 'block' : 'none',
            textAlign: 'center',
            padding: '20px',
          }}
        >
          <h3>
            Update Password <FaKey />
          </h3>
          <p>
            Protecting your account and personal information is our top priority.
            <br />
            Updating your password regularly is a crucial step in maintaining the security of your account.
            <br />
            By choosing a strong and unique password, you'll significantly reduce the risk of unauthorized access.
          </p>

          <div style={{ marginTop: '20px', textAlign: 'left', marginLeft: '20%' }}>
            <p>
              <strong>When updating your password, remember to follow these best practices:</strong>
            </p>
            <ul style={{ listStyleType: 'none', paddingLeft: 0, lineHeight: '1.8' }}>
              <li>‣ Use a combination of uppercase and lowercase letters</li>
              <li>‣ Incorporate numbers and special characters</li>
              <li>‣ Avoid using easily guessable information (e.g., name, birthdate)</li>
              <li>‣ Choose a password that's at least 8 characters long</li>
            </ul>
          </div>

          <UpdatePassword />
        </div>

        {/* New tab content for MyBookings */}
        <div
          className="prolific-profile-management-user-tabcontent"
          style={{ display: activeTab === 'MyBooking' ? 'block' : 'none' }}
        >
          <h3>My Bookings <FaBookmark /></h3>
          <p>Manage your flight bookings below:</p>
          <BookingList /> {/* Embed the BookingList component here */}
        </div>
      </div>
    </div>
  );
}

export default ProfileManagement;
