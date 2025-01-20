import React, { useState } from 'react';
import logo from '../images/logo.png';
import cart from '../images/cart.png';
import menu from '../images/menu.png';
import { Link } from 'react-router-dom';

function ClientHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar1">
      <div className="logo1">
        <a href="/"><img src={logo} alt="Logo" width="125px" /></a>
      </div>
      <nav className={`nav1 ${isMenuOpen ? 'open' : ''}`}>
        <ul id="MenuItems">
          <li>
            <Link to='/home'><a>Home</a></Link>
          </li>
          <li>
            <Link to='/shop'><a>Shop</a></Link>
          </li>
          <li>
            <Link to='/account'><a>Account</a></Link>
          </li>
        </ul>
      </nav>
      <Link to='/myCart'>
        <a href="/cart"><img src={cart} alt="Cart" width="30px" height="30px" /></a>
      </Link>
      <img 
        src={menu} 
        alt="Menu" 
        className="menu-icon1" 
        onClick={toggleMenu}
      />
    </div>
  );
}

export default ClientHeader;

