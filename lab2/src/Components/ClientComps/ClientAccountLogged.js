import React, { useState, useEffect } from 'react';
import AccountInfo from './AccountInfo';
import AccountPost from './AccountPost';
import AccountHistory from './AccountHistory';
import axios from 'axios';
import { jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom'; // For redirection

function ClientAccountLogged({ setIsLoggedIn }) {
  const [activePage, setActivePage] = useState('info');
  const [userData, setUserData] = useState(null);
  const [userProducts, setUserProducts] = useState([]);
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // Fetch logged-in user data, products, and purchased products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;
        const headers = { 'Authorization': `Bearer ${token}` };

        // Fetch logged-in user info
        const userResponse = await axios.get(`http://localhost:5000/api/users/${userId}`, { headers });
        const userData = userResponse.data;
        setUserData(userData);

        // Now check if the user is an admin after fetching data
        if (userData.userIsAdmin) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }

        // Fetch products listed by the user
        const productsResponse = await axios.get('http://localhost:5000/api/products', { headers });
        const userListedProducts = productsResponse.data.filter(
          product => product.seller === userId
        );
        setUserProducts(userListedProducts);

        // Fetch purchased products
        const purchasedResponse = await axios.get('http://localhost:5000/api/purchasedProducts', { headers });
        const userPurchasedProducts = purchasedResponse.data.filter(
          purchase => purchase.buyer === userId
        );
        setPurchasedProducts(userPurchasedProducts);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []); // Only run this effect once, on component mount

  const handleButtonClick = (page) => {
    setActivePage(page);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    document.cookie.split(";").forEach((c) => {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });
    setIsLoggedIn(false);
    window.location.reload();
  };

  const handleAdminRedirect = () => {
    if (isAdmin) {
      navigate('/admin'); // Redirect to the admin page if the user is an admin
    }
  };

  const debug = () => {
    console.log(userData?.userIsAdmin);
    console.log(userData?.userName);

    console.log('state thinks admin is: ', isAdmin);
  };

  return (
    <>
      <div className='container2'>
        <div className='accountBtns2'>
          <button
            className={activePage === 'info' ? 'current' : ''}
            onClick={() => handleButtonClick('info')}
          >
            Account Info
          </button>
          <button
            className={activePage === 'post' ? 'current' : ''}
            onClick={() => handleButtonClick('post')}
          >
            Create a Listing
          </button>
          <button
            className={activePage === 'history' ? 'current' : ''}
            onClick={() => handleButtonClick('history')}
          >
            Purchase History
          </button>
          <button onClick={handleLogout}>Log out</button>

          {isAdmin && (
            <button onClick={handleAdminRedirect}>
              Admin Page
            </button>
          )}

          <button onClick={debug}>Debug</button>
        </div>
      </div>

      <div className='mPages'>
        {activePage === 'info' && userData && (
          <AccountInfo 
            userData={userData} 
            userProducts={userProducts} 
            purchasedProducts={purchasedProducts} 
          />
        )}
        {activePage === 'post' && <AccountPost userProducts={userProducts} />}
        {activePage === 'history' && <AccountHistory purchasedProducts={purchasedProducts} />}
      </div>
    </>
  );
}

export default ClientAccountLogged;
