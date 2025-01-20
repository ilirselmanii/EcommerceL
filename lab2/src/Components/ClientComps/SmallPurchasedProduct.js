import React from 'react';
import productImg from '../images/product-4.jpg'; // Placeholder image

function SmallPurchasedProduct({ product, seller, datePurchased, quantityPurchased, pricePerProduct }) {
  return (
    <div className='ppbox'>
      <div className='ppImg'>
        <img src={product.productImage} alt={product.productName} />
      </div>
      <div className='ppInfoHolder'>
        <p>Name: {product.productName}</p>
        <p>Seller: {seller.userName}</p>
        <p>Date Purchased: {new Date(datePurchased).toLocaleDateString()}</p>
        <p>Quantity Purchased: {quantityPurchased}</p>
        <p>Price per product: ${pricePerProduct.toFixed(2)}</p>
        <p>Total Price: ${(pricePerProduct * quantityPurchased).toFixed(2)}</p>
      </div>
    </div>
  );
}

export default SmallPurchasedProduct;

