import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfilePic from '../images/user-1.png';

function AccountInfo({ userData, userProducts, purchasedProducts }) {
  const [userInfo, setUserInfo] = useState({
    userName: '',
    userEmail: '',
    userPhoneNum: '',
    userProfile: '',
    userDateOfCreation: '',
    userProducts: [],
    purchasedProducts: []
  });

  // Store the new profile picture file
  const [selectedFile, setSelectedFile] = useState(null);

  // Fetch user data when the component mounts
  useEffect(() => {
    if (userData) {
      setUserInfo({
        userName: userData.userName,
        userEmail: userData.userEmail,
        userPhoneNum: userData.userPhoneNum || '',
        userProfile: userData.userProfile,
        userDateOfCreation: userData.userDateOfCreation,
        userProducts: userData.userProducts || [],
        purchasedProducts: userData.purchasedProducts || [],
      });
    }
  }, [userData]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  // Handle profile picture change
  const handleProfilePictureChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]); // Save the file for uploading
      setUserInfo({ ...userInfo, userProfile: URL.createObjectURL(e.target.files[0]) });
    }
  };

  // Submit the updated user data via a PUT request
  const handleSubmitChanges = async () => {

    const preset_key = 'ecommerce_images'; // Make sure this preset is valid
    const cloud_name = 'diw1dnseq';

    try {
      const token = localStorage.getItem('token');
      const headers = { 'Authorization': `Bearer ${token}` };

      // If a new profile picture was selected, upload it to Cloudinary
      let profileImageUrl = userInfo.userProfile; // Default to current profile picture
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('upload_preset', `${preset_key}`); // Replace with your Cloudinary upload preset

        const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData);
        profileImageUrl = cloudinaryResponse.data.secure_url; // Get the secure URL for the uploaded image
      }

      const response = await axios.put(`http://localhost:5000/api/users/${userData._id}`, {
        userName: userInfo.userName,
        userEmail: userInfo.userEmail,
        userPhoneNum: userInfo.userPhoneNum,
        userProfile: profileImageUrl // Include the updated profile image URL
      }, { headers });

      console.log('User updated:', response.data);
      // Optionally show a success message here

    } catch (error) {
      console.error('Error updating user:', error);
      // Optionally show an error message here
    }
  };

  return (
    <div className='info2'> 
      <div className='mainInfo2'>
        <div className='profile-picture2'>
          <img src={userInfo.userProfile || ProfilePic} alt="User Profile" />
          <button className='cbtn' onClick={() => document.getElementById('getFile').click()}>
            Change your image
          </button>
          <input type="file" id="getFile" style={{ display: 'none' }} onChange={handleProfilePictureChange} />
        </div>
        <div className='mainInfoUser2'>
          <div className='form'>
            <div>
              <label>Username: </label>
              <input 
                name="userName" 
                value={userInfo.userName} 
                onChange={handleInputChange} 
              />
            </div>
            <div>
              <label>Email:</label>
              <input 
                name="userEmail" 
                value={userInfo.userEmail} 
                onChange={handleInputChange} 
              />
            </div>
            <div>
              <label>Phone Num: </label>
              <input 
                name="userPhoneNum" 
                value={userInfo.userPhoneNum} 
                onChange={handleInputChange} 
              />
            </div> 
            <div className='sbmtUserChange'>
              <button onClick={handleSubmitChanges}>Submit changes</button>
            </div>
          </div>
        </div>  
      </div>
      <div className='secInfo2'>
        <label>ID: {userData._id}</label>
        <label>Date of account creation: {new Date(userData.userDateOfCreation).toLocaleDateString()}</label>
        <label>Products currently listed: {userProducts.length}</label>
        <label>Products purchased: {purchasedProducts.length}</label>
        <label>Items sold: {userInfo.userProducts.filter(product => product.sold).length}</label>
      </div>
    </div>
  );
}

export default AccountInfo;
