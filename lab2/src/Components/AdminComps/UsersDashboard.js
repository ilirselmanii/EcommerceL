import React, { useState, useEffect } from 'react';
import '../css/Users.css';
import placeholderImg from '../placeholderImages/profilePLC.jpg';
import AdminIcons from './AdminIcons';

function UsersDashboard() {
  const dangerIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
    </svg>
  )

  const refreshSymbol = (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
      <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
    </svg>
  )

  const personSymbol = (
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-person-bounding-box" viewBox="0 0 16 16">
      <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5"/>
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
    </svg>
  )

  const usersSymbol = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16">
      <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"/>
    </svg>
  )

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    isAdmin: false,
    selectedFile: null
  });  

  const [formInputs, setFormInputs] = useState({
    userName: '',
    userEmail: '',
    userPhoneNum: '',
    userPassword: '',
    userIsAdmin: false,
    userProfile: null
  });

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [photoError, setPhotoError] = useState('');

  
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [throwAlert, setThrowAlert] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const [usernameAvailability, setUsernameAvailability] = useState(true);
  const [emailValidity, setEmailValidity] = useState(true);
  const [emailAvailability, setEmailAvailability] = useState(true);
  const [phoneValidity, setPhoneValidity] = useState(true);
  const [phoneAvailability, setPhoneAvailability] = useState(true);
  const [invalidImageUrl, setInvalidImageUrl] = useState(false);


  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    selectedPage(page);
  }, [page]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };
  
  const filteredUsers = users.filter(user =>
    user.userName.toLowerCase().includes(searchTerm)
  );

  const selectedPage = (pageNum) => {
    const buttonPageOne = document.getElementsByClassName('ulU')[0];
    const buttonPageTwo = document.getElementsByClassName('cau')[0];
    
    const pageOne = document.getElementsByClassName('bodyContainer')[0];
    const pageTwo = document.getElementsByClassName('createUserContainer')[0];
  
    if (pageNum === 1) {
      buttonPageOne.style.textDecoration = "underline";
      buttonPageTwo.style.textDecoration = "none";
      pageOne.style.display = "flex";
      pageTwo.style.display = "none";
    } else {
      buttonPageOne.style.textDecoration = "none";
      buttonPageTwo.style.textDecoration = "underline";
      pageOne.style.display = "none";
      pageTwo.style.display = "flex";
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.toLocaleDateString()} at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    return formattedDate;
  };

  const handleEditUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`);
      const userData = await response.json();
      setEditingUser(userData);
  
      setFormInputs({
        userName: userData.userName,
        userEmail: userData.userEmail,
        userPhoneNum: userData.userPhoneNum,
        userPassword: userData.userPassword,
        userIsAdmin: userData.userIsAdmin,
        userProfile: userData.userProfile
      });

      handleRefresh();
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      // Handle file input change
      const file = files[0];
      if (file) {
        setNewUser(prevState => ({
          ...prevState,
          selectedFile: file, // Store the file object
        }));
      }
    } else {
      // Handle text input change
      const newValue = type === 'checkbox' ? checked : value;
      setFormInputs(prevState => ({ ...prevState, [name]: newValue }));
    }
  
    // Clear errors
    setNameError('');
    setEmailError('');
    setPhoneError('');
    setPhotoError('');
  };
  
  
  const handleUpdateUser = async (e) => {
    e.preventDefault();
  
    let isValid = true;

    // Validate the user inputs
    if (formInputs.userName.trim() === '') {
      setNameError('Name cannot be empty.');
      isValid = false;
    } else {
      setNameError('');
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formInputs.userEmail.trim() === '' || !emailPattern.test(formInputs.userEmail)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError('');
    }

    const phonePattern = /^\d{10}$/;
    if (formInputs.userPhoneNum.trim() === '' || !phonePattern.test(formInputs.userPhoneNum)) {
      setPhoneError('Please enter a valid phone number.');
      isValid = false;
    } else {
      setPhoneError('');
    }

    // Validate the selected file
    if (newUser.selectedFile) { // Only validate if a file is selected
      const imageExtensions = /\.(jpeg|jpg|png|gif)$/i;
      if (!imageExtensions.test(newUser.selectedFile.name)) { // Check the file name
        setPhotoError('Please enter a valid image URL (JPEG, JPG, PNG, GIF).');
        isValid = false;
      } else {
        setPhotoError('');
      }
    }

    if (isValid) {
      try {
        let updatedUserData = { ...formInputs }; // Prepare user data for update

        // If a new image is selected, upload it to Cloudinary
        if (newUser.selectedFile) {
          const preset_key = 'ecommerce_images';
          const cloud_name = 'diw1dnseq';
  
          const formData = new FormData();
          formData.append('file', newUser.selectedFile);
          formData.append('upload_preset', preset_key);
  
          // Upload image to Cloudinary
          const cloudinaryResponse = await fetch(
            `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
            {
              method: 'POST',
              body: formData
            }
          );
          
          const imageData = await cloudinaryResponse.json();
          updatedUserData.userProfile = imageData.secure_url; // Assign the Cloudinary URL
        }

        // Send the updated user data to the server
        const response = await fetch(`http://localhost:5000/api/users/${editingUser._id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedUserData), // Use updatedUserData here
        });

        if (response.ok) {
          alert('User has been edited');
          setEditingUser(null);
          handleRefresh();
        } else {
            const data = await response.json();
            console.error('Error updating user:', data.message);

            if (response.status === 400) {
                alert('User has not been edited. Check inputs.');
            } else {
                alert(data.message);
            }
        }
      } catch (error) {
        console.error('An error occurred:', error);
        alert('An error occurred: ' + error.message); 
      }
    }
};
   
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'profileUrl') {
      setNewUser({ ...newUser, selectedFile: value });
    } else {
      const newValue = type === 'checkbox' ? checked : value;
      setNewUser({ ...newUser, [name]: newValue });
    }
  };
  
  const handleDiscard = (e) => {
    e.preventDefault();
    setNewUser({
      name: '',
      email: '',
      phone: '',
      password: '',
      isAdmin: false,
      selectedFile: null 
    });
  };

  const checkUsernameAvailability = (username) => {
   setTimeout(() => {
      const isAvailable = !users.find(user => user.userName === username);
      setUsernameAvailability(isAvailable);
    }, 500); 
  };

  const checkEmailValidity = (email) => {
    setTimeout(() => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = email === '' || emailPattern.test(email);
      setEmailValidity(isValid);
    }, 1000)
  };
  
  const checkEmailAvailability = (email) => {
    setTimeout(() => {
      const isAvailable = !users.find(user => user.userEmail === email);
      setEmailAvailability(isAvailable);
    }, 500); 
  };

  const checkPhoneNumberValidity = (phoneNumber) => {
    setTimeout(() => {
      const phonePattern = /^[\d -]{10}$/;
      const isValid = phoneNumber === '' || phonePattern.test(phoneNumber);
      setPhoneValidity(isValid);
    }, 500);
  };  
  const checkPhoneNumberAvailability = (phoneNumber) => {
    setTimeout(() => {
      const isAvailable = !users.find(user => user.userPhoneNum === phoneNumber);
      setPhoneAvailability(isAvailable);
    }, 500); 
  };

  const handleUsernameChange = (e) => {
    const { value } = e.target;
    setNewUser(prevState => ({ ...prevState, name: value }));
    checkUsernameAvailability(value);
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setNewUser(prevState => ({ ...prevState, email: value }));
    checkEmailValidity(value);
    checkEmailAvailability(value);
  };

  const handlePhoneChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
    const numericValue = value.replace(/\D/g, '');
    checkPhoneNumberValidity(numericValue);
    checkPhoneNumberAvailability(numericValue);
  };
  
  useEffect(() => {
    checkUsernameAvailability(newUser.name);
    checkEmailValidity(newUser.email);
    checkEmailAvailability(newUser.email);
    checkPhoneNumberValidity(newUser.phone);
    checkPhoneNumberAvailability(newUser.phone)
  }, [newUser.name, newUser.email, newUser.phone]);

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setNewUser(prevState => ({
        ...prevState,
        selectedFile: file // Set the selected file as an object
      }));
    }
  };
  
 const handleSubmit = async (e) => {
  e.preventDefault();

  const preset_key = 'ecommerce_images'; // Make sure this preset is valid
  const cloud_name = 'diw1dnseq';

  // Check if the file is selected
  if (!newUser.selectedFile) {
    console.error('No file selected for upload');
    return;
  }

  const formData = new FormData();
  formData.append('file', newUser.selectedFile); // Ensure the file is valid
  formData.append('upload_preset', preset_key); // Ensure preset is correct

  try {
    // Upload image to Cloudinary
    const cloudinaryResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
    
    const imageData = await cloudinaryResponse.json();

    if (imageData.error) {
      throw new Error(imageData.error.message); // Handle Cloudinary error
    }

    // Create user with image URL from Cloudinary
    const userData = {
      userName: newUser.name,
      userEmail: newUser.email,
      userPhoneNum: newUser.phone,
      userPassword: newUser.password,
      userIsAdmin: newUser.isAdmin,
      userProfile: imageData.secure_url, // Use the Cloudinary URL
    };

    const response = await fetch('http://localhost:5000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      console.log('User created successfully!');
      handleRefresh();
      setNewUser({
        name: '',
        email: '',
        phone: '',
        password: '',
        isAdmin: false,
        selectedFile: null,
      });
    } else {
      console.error('Error creating user:', response.statusText);
    }
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
};

  
  
  const handleDeleteUser = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`http://localhost:5000/api/users/${editingUser._id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        handleAlert();
        setFormInputs({
          userName: '',
          userEmail: '',
          userPhoneNum: '',
          userPassword: '',
          userIsAdmin: false,
        });
        setEditingUser(null);
      } else {
        console.error('Error deleting user:', response.statusText);
      }

      handleRefresh();
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  
  const handleAlert = () => {
    setThrowAlert(!throwAlert);
  }

  const handleImagePaste = (e) => {
    const pastedUrl = e.clipboardData.getData('text');
    const imageExtensions = /\.(jpeg|jpg|png|gif)$/i;
    
    if (imageExtensions.test(pastedUrl)) {
      setNewUser({ ...newUser, selectedFile: pastedUrl });
      setPhotoError('');
    } else {
      setPhotoError('Please paste a valid image URL (JPEG, JPG, PNG, GIF).');
    }
  };
  
  const handleRefresh = async () => {
    fetchUsers();
  };

  const handleCancelChanges = () => {
    setEditingUser(null);
  };
  
  return (
    <div className='userMainCont'>
      <div className='header'>
        <div className='title'>
          <h1>Users Dashboard</h1>
        </div>
        <div className='dashboardNav'>
          <button className='ulU' onClick={() => selectedPage(1)}>User List/Update</button>
          <button className='cau' onClick={() => selectedPage(2)}>Create a user</button>
        </div>
      </div>
      <div className='bodyContainer'>
        <div className='listContainer'>
          <div className='userSearch'>
          <input
            className="userSeachInput"
            type="text"
            placeholder="Search for a specific user"
            value={searchTerm}
            onChange={handleSearchChange}
          />
            <h2 onClick={handleRefresh}>{refreshSymbol}</h2>
            <div className='noUsers'>
              <p>{usersSymbol}</p>
              <p>{users.length}</p>
            </div>
          </div>
                {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <div key={user._id} className='userCard'>
                <div className='mainInfo'>
                  <div className='userMainInfo'>
                    <div className='userImg'>
                      <img src={user.userProfile || placeholderImg} alt='Profile'></img>
                    </div>
                    <div className='userTitle'>
                      <h3>{user.userName}</h3>
                      <p>{user.userEmail}</p>
                    </div>
                  </div>  
                  <div className='userBtn'>
                    <button className='editBtn' onClick={() => handleEditUser(user._id)}>Edit User</button>
                  </div>
                </div>
                <div className='userInfo'>
                  <p className='passwordEl'>Password: {user.userPassword}</p>
                  <p className='phoneEl'>Phone number: {user.userPhoneNum}</p>
                  <p className='dateOfCreation'>Account created at: {formatDate(user.userDateOfCreation)}</p>
                  <p className='userId'>User ID: {user._id}</p>
                </div>
              </div>
            ))
          ) : (
            <div className='zeroUsers'>
              <h1>We couldn't find any users with the name: "{searchTerm}"</h1>
              <AdminIcons.sadIcon />
            </div>
          )}
        </div>
        <form>
  <div className='infoContainer'>
    {editingUser ? (
      <React.Fragment>
        <div className='rightMainUserInfo'>
          <div className='rightUserImage'>
            <img src={formInputs.userProfile} className='rightPLCIMG' alt='Profile'></img>
          </div>
          <div className='rightUserTitle'>
            <div className='inpt'>
              <label>Name: </label>
              <input type='text' value={formInputs.userName} onChange={handleInputChange} name='userName' />
            </div>
            {nameError && <p className="errorMessage">{nameError}</p>}
            <div className='inpt'>
              <label>Email: </label>
              <input type='email' value={formInputs.userEmail} onChange={handleInputChange} name='userEmail' />
            </div>
            {emailError && <p className="errorMessage">{emailError}</p>}
            <div className='inpt'>
              <label>Phone Num: </label>
              <input type='tel' value={formInputs.userPhoneNum} onChange={handleInputChange} name='userPhoneNum' />
            </div>
            {phoneError && <p className="errorMessage">{phoneError}</p>}
            <div className='inpt file'>
            <label class="custom-file-upload-edit">
                <input type="file" onChange={handleInputChange}/>
                Upload New Image Here
            </label>
            </div>
            {photoError && <p className="errorMessage">{photoError}</p>}
          </div>
        </div>
        <div className='rightMoreInfo'>
          <div className='inptMI'>
            <label>Password: </label>
            <input type='password' value={formInputs.userPassword} onChange={handleInputChange} name='userPassword' className='inptMIi'/>
          </div>
          <div className='inptMI'>
            <label>Is Admin: </label>
            <input type='checkbox' checked={formInputs.userIsAdmin} onChange={handleInputChange} name='userIsAdmin' className='inptMIi'/>
          </div>
          <div className='inptMI'>
            <label>Date of Creation: </label>
            <input type='text' value={formatDate(editingUser.userDateOfCreation)} readOnly ></input>
          </div>
        </div>
        <div className='rightBtns'>
          <button className='update' onClick={handleUpdateUser}>Confirm Changes</button>
          <button className='cancel' onClick={handleCancelChanges}>Cancel Changes</button>
          <button type='button' className='delete' onClick={handleAlert}>Delete User</button>
        </div>
      </React.Fragment>
    ) : (
      <div className='defaultInfoContainer'>
        <h1>{personSymbol}</h1>
        <h1>Edit User</h1>
        <h3>Please select a user on the left pannel to edit them</h3>
      </div>
    )}
    {/* DELETE ALERT */}
    {throwAlert && (
      <div className='deleteAlert'>
        <h1>{dangerIcon}</h1>
        <p>Are you sure you want to delete "{formInputs.userName}" from the database?</p>
        <div className='delBtnCont'>
          <button type="button" className='trueDelete' onClick={handleDeleteUser}>Delete</button>
          <button type="button" className='cancelDeletion' onClick={handleAlert}>Cancel</button>
        </div>  
      </div>
    )}
  </div>
</form>
      </div>

      {/* CREATE USER CONT */}
      <div className='createUserContainer' style={{ display: 'none' }}>
        <div className='cuTitle'>
          <h1>Create User</h1>
        </div>
        <form className="createUserForm" onSubmit={handleSubmit} enctype="multipart/form-data">
          <div className='createUserLeft'>
            <div className='cuInputs'>
              <div className='cInput'>
                <label>Name:</label>
                <input type='text' name='name' value={newUser.name} onChange={handleUsernameChange}></input>
              </div>
              {!usernameAvailability && <p className='createError'>Username is taken.</p>}
              <div className='cInput'>
                <label>Email:</label>
                <input type='email' name='email' value={newUser.email} onChange={handleEmailChange}></input>
              </div>
              {!emailValidity && <p className='createError'>Invalid email format.</p>}
              {!emailAvailability && <p className='createError'>Email is already registered.</p>}
              <div className='cInput'>
                <label>Phone Number:</label>
                <input type='number' name='phone' value={newUser.phone} onChange={handlePhoneChange}></input>
              </div>
              {!phoneValidity && <p className='createError'>Please enter a valid phone number.</p>}
              {!phoneAvailability && <p className='createError'>This phone number is already in use.</p>}
              <div className='cInput'>
                <label>Password:</label>
                <input type='password' name='password' value={newUser.password} onChange={handleChange}></input>
              </div>
              <div className='cInput'>
                <label>Is Admin:</label>
                <input type='checkbox' name='isAdmin' checked={newUser.isAdmin} onChange={handleChange} className='createCheck'></input>
              </div>
            </div>
          </div>
          <div className='createUserRight'>
          <div className='inputPic'>
            {newUser.selectedFile && (
              <img src={URL.createObjectURL(newUser.selectedFile)} alt='Profile' />
            )}
          </div>
            <div className='profileFind'>
            <label class="custom-file-upload">
                <input type="file" onChange={handleFileChange}/>
                Upload Image Here
            </label>
            </div>
            <div className='createUserButtons'>
              <button type='submit' className='createNewUser'>Create User</button>
              <button className='discardNewUser' onClick={handleDiscard}>Discard User</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UsersDashboard;
