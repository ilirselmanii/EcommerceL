import React from 'react';
import product11 from '../images/product-11.jpg';
import product5 from '../images/product-5.jpg';

function ProductShowcase({ product, productSeller, handleAddToCart, er, ner }) {
  return (
    <div className="small-container1 single-product1">
      <div className="row1">
        <div className="col1-2">
          <img src={product.productImage} alt={product.productName} width="100%" id="productImg1" />

          <div className="small-img-row1">
          </div>
        </div>

        <div className="col1-2">
          <h1>{product.productName}</h1>
          <h4>${product.productPrice}</h4>
          <p>{product.productCategory}</p>
          <input type="number" id="quantityInput" defaultValue="1" /> <label>{product.productQuantity} left</label>
          <button onClick={() => handleAddToCart(product)} className="btn12">Add to Cart</button>
          <div className="message-container">
            {er && <label className="er">{er}</label>}
            {ner && <label className="ner">{ner}</label>}
          </div>
          <h3>Product Details <i className="fa fa-indent"></i></h3>
          <p>Published by {productSeller?.userName} - {new Date(product.productDateOfListing).toLocaleDateString()}</p>
          <br />
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductShowcase;
