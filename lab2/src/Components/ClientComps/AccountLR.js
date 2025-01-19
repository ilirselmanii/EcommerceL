import React from 'react';
import productImage from '../images/image1.png';

const AccountLR = ({
  isLogin,
  handleToggle,
  formData,
  handleInputChange,
  handleSubmit,
  noError,
  error,
  isLoggedIn
}) => {
  return (
    <div className="account-page1">
      <div className="container1">
        <div className="row1">
          <div className="col1-2">
            <img src={productImage} alt="Account" width="100%" />
          </div>
          <div className="col1-2">
            <div className="form-container1">
              <div className="form-btn1">
                <span onClick={() => handleToggle(true)}>Login</span>
                <span onClick={() => handleToggle(false)}>Register</span>
                <hr
                  id="Indicator"
                  style={{ transform: isLogin ? 'translateX(0px)' : 'translateX(100px)' }}
                />
              </div>
              <div className="form-slide1">
                <form
                  id="LoginForm1"
                  onSubmit={handleSubmit}
                  style={{
                    transform: isLogin ? 'translateX(0px)' : 'translateX(-300px)',
                  }}
                >
                  <input
                    type="text"
                    name="userName"
                    placeholder="Username"
                    value={formData.userName}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="password"
                    name="userPassword"
                    placeholder="Password"
                    value={formData.userPassword}
                    onChange={handleInputChange}
                    required
                  />
                  <button type="submit" className="btn1">Login</button>
                  <a href="/">Forgot password?</a>
                  {noError && <p className="accNoErrorTxt">{noError}</p>}
                  {error && <p className="accErrorTxt">{error}</p>}
                </form>
                <form
                  id="RegForm1"
                  onSubmit={handleSubmit}
                  style={{
                    transform: isLogin ? 'translateX(300px)' : 'translateX(0px)',
                  }}
                >
                  <input
                    type="text"
                    name="userName"
                    placeholder="Username"
                    value={formData.userName}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="email"
                    name="userEmail"
                    placeholder="Email"
                    value={formData.userEmail}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="password"
                    name="userPassword"
                    placeholder="Password"
                    value={formData.userPassword}
                    onChange={handleInputChange}
                    required
                  />
                  <button type="submit" className="btn1">Register</button>
                  {noError && <p className="accNoErrorTxt">{noError}</p>}
                  {error && <p className="accErrorTxt">{error}</p>}
                </form>

                {isLoggedIn && <p className='tkn'>Token Valid</p>}
                {!isLoggedIn && <p className='tkn'>Token Not Valid</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountLR;
