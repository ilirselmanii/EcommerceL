import React, { useState , useEffect } from 'react';
import plc from '../../placeholderImages/profilePLC.jpg';

function ProductCard({ product, setProducts, onRefresh }) {

  const [recentlyDeleted, setRecentlyDeleted] = useState(null);
  const [showDeletedMessage, setShowDeletedMessage] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleClick = (productID) => {
    setRecentlyDeleted(productID);
    setShowDeletedMessage(true);
    setProgress(0);

    fetch(`http://localhost:5000/api/products/${product._id}`, {
      method: 'DELETE',
    })
    .then(() => {
      let timer = 0;
      const interval = setInterval(() => {
        timer += 100;
        setProgress((timer / 4000) * 100); 
        if (timer >= 4000) {
          clearInterval(interval);
          setShowDeletedMessage(false);
          setTimeout(() => {
            onRefresh();
          }, 500);
        }
      }, 100); 
    })
    .catch(error => console.error('Error deleting product:', error));
  };

  return (
    <div className='pCardMain'>
      <div className='rowOne'>
        <div className='rowOneLeft'>
          <div className='pCardTitle'>
            <h2>{product.productName}</h2>
            <p>Date Published: {new Date(product.productDateOfListing).toLocaleDateString()}</p>
          </div>
          <div className='pCardDesc'>
            <p>Description:</p>
            <p>{product.description}</p>
          </div>
        </div>
        <div className='rowOneRight'>
          <img src={product.productImage} alt="Product" />
        </div>
      </div>
      <div className='rowTwo'>
        <button className='delProduct' onClick={() => handleClick(product._id)}>Delete Product</button>
      </div>
      <p className='pID'>Product Price: ${product.productPrice}</p>
      <p className='pID'>Product Category: {product.productCategory}</p>
      <p className='pID'>Product ID: {product._id}</p>
      <div className='rowThree'>
        <p>Published by:</p>
        <div className='pCardPublisher'>
          <img src={plc} alt="Publisher" />
          <p>{product.seller}</p>
        </div>
      </div>
      <div className="product-deleted" style={{ transform: showDeletedMessage ? 'translateX(0)' : 'translateX(300px)' }}>
          <div className='topPD'>
            <p>Product with ID:</p>
            <p>{recentlyDeleted}</p>
            <p>Has been deleted successfully</p>
          </div>
          <div className='barPD'>
            <div className='fullBar' style={{ width: `${progress}%` }}>
              
            </div>
          </div>
      </div>
    </div>
  );
}

export default ProductCard;
