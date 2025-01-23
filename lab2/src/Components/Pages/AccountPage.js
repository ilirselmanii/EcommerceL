import React, { useState, useEffect } from 'react';
import ClientHeader from '../ClientComps/ClientHeader';
import ClientFooter from '../ClientComps/ClientFooter';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useLocation } from 'react-router-dom';
import AccountLR from '../ClientComps/AccountLR';
import ClientAccountLogged from '../ClientComps/ClientAccountLogged';

const AccountPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({ userName: '', userEmail: '', userPassword: '' });
  const location = useLocation();
  const [error, setError] = useState('');
  const [noError, setnoError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tokenValid, setTokenValid] = useState(false);

  useEffect(() => {
    if (location.state?.errorMessage) {
      setError(location.state.errorMessage);
      setIsLogin(true);
    }
  }, [location]);

  useEffect(() => {
    const checkTokenValidity = () => {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode(token);
        const isTokenValid = decodedToken.exp * 1000 > Date.now(); 
        setTokenValid(isTokenValid);
        setIsLoggedIn(isTokenValid); 
      }
    };
    const intervalId = setInterval(checkTokenValidity, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleToggle = (login) => {
    setIsLogin(login);
    setError('');
    setnoError('');
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const url = isLogin ? 'http://localhost:5000/api/users/login' : 'http://localhost:5000/api/users/register';
    try {
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token);

        const decodedToken = jwtDecode(token);
        const isTokenValid = decodedToken.exp * 1000 > Date.now();

        setTokenValid(isTokenValid);
        setIsLoggedIn(isTokenValid);

        setnoError('Success!');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <>
      <div className="container1">
        <ClientHeader />
      </div>

      {/* Conditional rendering based on isLoggedIn state */}
      {!isLoggedIn ? (
        <AccountLR
          isLogin={isLogin}
          handleToggle={handleToggle}
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          noError={noError}
          error={error}
        />
      ) : (
        <ClientAccountLogged 
          setIsLoggedIn={setIsLoggedIn}
        />
      )}

      <ClientFooter />
    </>
  );
};

export default AccountPage;
