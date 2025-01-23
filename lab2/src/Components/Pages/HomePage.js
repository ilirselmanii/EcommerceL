import React from 'react';
import '../css/Client.css'; 
import image1 from '../images/image1.png';

import category1 from '../images/category-1.jpg';
import category2 from '../images/category-2.jpg';
import category3 from '../images/category-3.jpg';
import product from '../images/product-2.jpg';

import ClientHeader from '../ClientComps/ClientHeader';
import ClientFooter from '../ClientComps/ClientFooter';

const HomePage = () => {
  const menutoggle = () => {
    const menuItems = document.getElementById("MenuItems");
    menuItems.style.maxHeight === "0px"
      ? (menuItems.style.maxHeight = "200px")
      : (menuItems.style.maxHeight = "0px");
  };

  return (
    <>
      <header className="header1">
        <div className="container1">
            <ClientHeader />
          <div className="row1">
            <div className="col1-2">
              <h1>We have everything <br />Anything!</h1>
              <p>Discover the latest trends and timeless classics, all in one place.<br />Shop now and experience the difference.</p>
              <a href="/products" className="btn1">Explore Now &#8594;</a>
            </div>
            <div className="col1-2">
              <img src={image1} alt="Workout" />
            </div>
          </div>
        </div>
      </header>

      <section className="categories1">
        <div className="small-container1">
          <div className="row1">
            <div className="col1-3">
              <img src={category1} alt="Category 1" />
            </div>
            <div className="col1-3">
              <img src={category2} alt="Category 2" />
            </div>
            <div className="col1-3">
              <img src={category3} alt="Category 3" />
            </div>
          </div>
        </div>
      </section>

    {/* SMALL CARD */}
      <section className="small-container1 featured-products1">
        <h2 className="title1">Featured Products</h2>
        <div className="row1">
          <div className="col1-4">
            <a href="/product-details"><img src={product} alt="Product 11" /></a>
            <a href="/product-details"><h4>Downshifter Sports Shoes</h4></a>
            <div className="rating1">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star-half-o"></i>
              <i className="fa fa-star-o"></i>
            </div>
            <p>$50.00</p>
          </div>
        </div>
      </section>

      <ClientFooter />
    </>
  );
};

export default HomePage;
