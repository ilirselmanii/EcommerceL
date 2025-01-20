import React from 'react'
import playStore from '../images/play-store.png';
import appStore from '../images/app-store.png';
import whiteLogo from '../images/logo-white.png';


function ClientFooter() {
  return (
    <div>
      <footer className="footer1">
        <div className="container1">
          <div className="row1">
            <div className="footer-col1-1">
              <h3>Download Our App</h3>
              <p>Download App for Android and iOS mobile phone.</p>
              <div className="app-logo1">
                <img src={playStore} alt="Play Store" />
                <img src={appStore} alt="App Store" />
              </div>
            </div>
            <div className="footer-col1-2">
              <img src={whiteLogo} alt="White Logo" />
              <p>Our Purpose Is To Sustainably Make the Pleasure and Benefits of Sports Accessible to Many.</p>
            </div>
            <div className="footer-col1-3">
              <h3>Useful Links</h3>
              <ul>
                <li>Coupons</li>
                <li>Blog Post</li>
                <li>Return Policy</li>
                <li>Join Affiliate</li>
              </ul>
            </div>
            <div className="footer-col1-4">
              <h3>Follow us</h3>
              <ul>
                <li>Facebook</li>
                <li>Twitter</li>
                <li>Instagram</li>
                <li>YouTube</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ClientFooter
