import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const Profile = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const { userId } = location.state || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      fetch(`https://dummyjson.com/users/${userId}`)
        .then(res => res.json())
        .then(data => {
          console.log('User data:', data);
          setUser(data);
        })
        .catch(err => {
          console.error('Error fetching user data:', err);
        });
    }
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const backToHome = () => {
    localStorage.removeItem('user');
    setUser({ token: '', userId: '', username: '' });
    navigate('/');
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Logged out successfully!',
      showConfirmButton: false,
      timer: 1500,
    });
  };
  
  const Home = () => {
    navigate('/');
  }

  return (
    <>
    <div className='divHeader'>
      <div className='shopCart'>
        <br />  <br />  <br />

        <i><h1>My Profile</h1></i>

        <pre /> <pre /> <pre /> <pre /> <pre /> <pre /> <pre /> <pre />
        <pre /> <pre /> <pre /> <pre /> <pre /> <pre /> <pre /> <pre />
        
        <button className='backBTN' onClick={backToHome}>Log out</button>
        <button className='backBTN' onClick={Home}>Home</button>
      </div>

    </div>
    <div className="profile-container">
      <div className="profile-header">
        <img src={user.image} alt={user.username} className="profile-image" />
        <div className="profile-info">
          <h1>{user.firstName} {user.lastName}</h1>
          <p className="profile-title">{user.title}</p>
          <div className="profile-rating">
            {/* <span>{user.rating}</span> ★★★ */}
          </div>
          <button className="profile-button">Send Message</button>
          <button className="profile-button">Add Contact</button>
        </div>
      </div>
      <div className="profile-details">
        <div className="profile-contact">
          <h2>Contact Information</h2>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Address:</strong> {user.address.address}, {user.address.city}, {user.address.state}, {user.address.postalCode}</p>
          <p><strong>Website:</strong> {user.website}</p>
        </div>
        <div className="profile-additional">
          <h2>Additional Information</h2>
          <p><strong>Birthday:</strong> {user.birthDate}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
        </div>
      </div>
      
    </div>
    </>
  );
};

export default Profile;
