import React from 'react'
import productimg from '../images/product-2.jpg';

import { useNavigate } from 'react-router-dom';

function SmallProductCard({ product }) {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${product._id}`);
  };

  return (
    <div className="col1-4" onClick={handleClick}>
        <a><img src={product.productImage} alt={productimg} /></a>
        <a><h4>{product.productName}</h4></a>
        <p>${product.productPrice.toFixed(2)}</p> 
        <p>{product.productQuantity} left</p>
        <p>{product.productCategory}</p>
    </div>
  )
}

export default SmallProductCard
