import React, { useState, useEffect } from 'react';
import profileImage from '../placeholderImages/profilePLC.jpg'; // Fallback image
import '../css/AdminPage.css';
import UsersDashboard from '../AdminComps/UsersDashboard';
import ProductsDashboard from '../AdminComps/ProductsDashboard';
import PurchasedProductsDashboard from '../AdminComps/PurchasedProductsDashboard';
import DefaultDash from '../AdminComps/DefaultDash';
import AdminCons from '../AdminComps/AdminCons';
import { Link } from 'react-router-dom';
import NotAdminPage from './NotAdminPage';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Install jwt-decode if not already done
import Analytics from '../AdminComps/Analytics';

export default function AdminPage() {
    const [selected, setSelected] = useState(null);
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    // Function to fetch the user data
    const fetchUserData = async () => {

        try {
            const token = localStorage.getItem('token'); // Assuming the JWT is stored in localStorage

            if (!token) {
                setIsAdmin(false); // No token, assume not admin
                return;
            }

            // Decode token to get user ID
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id; // Adjust if your token structure is different
            
            // Fetch user data using the decoded user ID
            const response = await axios.get(`http://localhost:5000/api/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });


            setUser(response.data);
            setIsAdmin(response.data.userIsAdmin); // Assuming `userIsAdmin` is the correct field        
        } catch (error) {
            console.error("Error fetching user data:", error);
            setIsAdmin(false); // Assume not admin in case of error
        }
    };

    // Check the user's admin status every 5 seconds
    useEffect(() => {
        fetchUserData(); // Fetch once when component mounts

        const interval = setInterval(() => {
            fetchUserData();
        }, 5000); // Check every 5 seconds

        return () => clearInterval(interval); // Clear interval on unmount
    }, []);

    const handleClick = (id) => {
        setSelected(prevSelected => (prevSelected === id ? null : id));
    };

    // If user is not admin, render the NotAdminPage immediately
    if (!isAdmin) {
        return <NotAdminPage />;
    }

    // Render the admin page if the user is an admin
    return (
        <div className='adminPage'>
            <div className='menu'>
                <div className='logo'>
                    <h1>Logged in as:</h1>
                </div>
                <div className='adminProfile'>
                    <div className='pimage'>
                        <img src={user?.userProfile || profileImage} alt="Profile" /> {/* User profile image or placeholder */}
                    </div>
                    <div className='pinfo'>
                        <h3>Administrator</h3>
                        <p>{user ? user.userName : "Filan Baba"}</p> {/* User name or placeholder */}
                    </div>
                </div>
                <hr />
                <div className='dashboard'>
                    <h3>Dashboard</h3>
                    <div className='db'>
                        <hr className='line' />
                        <div className='dashboardEntries'>
                            <ul>
                                <li className={selected === 1 ? 'active' : ''} onClick={() => handleClick(1)}>Users</li>
                                <li className={selected === 2 ? 'active' : ''} onClick={() => handleClick(2)}>Products</li>
                                <li className={selected === 3 ? 'active' : ''} onClick={() => handleClick(3)}>Purchased</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='analytics'>
                    <h3>Data</h3>
                    <div className='db'>
                        <hr className='line' />
                        <div className='dashboardEntries'>
                            <ul>
                                <li className={selected === 8 ? 'active' : ''} onClick={() => handleClick(8)}>Analytics</li>
                                <li className={selected === 10 ? 'active' : ''} onClick={() => handleClick(10)}>Console</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='btns'>
                    <button className='lgout'>Log out</button>
                    <Link to='/home'>
                        <button className='swtch'>Back to shop</button>
                    </Link>
                </div>
            </div>
            <div className='mainContainer'>
                {selected === null && <DefaultDash />}
                {selected === 1 && <UsersDashboard />}
                {selected === 2 && <ProductsDashboard />}
                {selected === 3 && <PurchasedProductsDashboard />}
                {selected === 8 && <Analytics />}
                {selected === 10 && <AdminCons />}
            </div>
        </div>
    );
}
