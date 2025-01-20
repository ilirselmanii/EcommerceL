import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // To handle redirection

function ProductShowcase({ product, productSeller, handleAddToCart, er, ner }) {
  const [editableProduct, setEditableProduct] = useState({ ...product });
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(product.productImage);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Display the preview
      };
      reader.readAsDataURL(file); // Convert image to base64 format for preview
      setSelectedFile(file); // Save the selected file for upload
    }
  };

  const handleApplyChanges = async () => {
    let productImageUrl = editableProduct.productImage; // Default to the current image URL

    const preset_key = 'ecommerce_images'; // Make sure this preset is valid
    const cloud_name = 'diw1dnseq';

    // If a new image is selected, upload it to Cloudinary
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('upload_preset', preset_key); // Replace with your Cloudinary upload preset

      try {
        const cloudinaryResponse = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
          method: 'POST',
          body: formData
        });
        const cloudinaryData = await cloudinaryResponse.json();
        productImageUrl = cloudinaryData.secure_url; // Get the secure URL of the uploaded image
      } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        return;
      }
    }

    // Update the product data with the new image URL
    const updatedProduct = { ...editableProduct, productImage: productImageUrl };

    try {
      await axios.put(`http://localhost:5000/api/products/${product._id}`, updatedProduct);
      setMessage('Product Successfully Updated!');
      setTimeout(() => setMessage(''), 3000); // Hide message after 3 seconds
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleRemoveListing = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${product._id}`);
      setMessage('Your product has been deleted.');
      setTimeout(() => {
        setMessage('');
        navigate('/shop');
      }, 3000); // Redirect after 3 seconds
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="small-container1 single-product1">
      <div className="row1">
        <div className="col1-2">
          {/* Product Image Preview */}
          <img src={imagePreview} alt={editableProduct.productName} width="100%" id="productImg1" />
          <div className="small-img-row1">
            <button className='cbtn' onClick={() => document.getElementById('getFile').click()}>
              Change product Image
            </button>
            <input
              type="file"
              id="getFile"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
          </div>
        </div>

        <div className="col1-2">
          <div className='col1-21'>
            <label>Product title:</label>
            <input
              className='colInpt'
              type="text"
              name="productName"
              value={editableProduct.productName}
              onChange={handleInputChange}
            />

            <label>Product price:</label>
            <input
              className='colInpt'
              type="number"
              name="productPrice"
              value={editableProduct.productPrice}
              onChange={handleInputChange}
            />

            <label>Product category:</label>
            <select
              className='colInpt'
              name="productCategory"
              value={editableProduct.productCategory}
              onChange={handleInputChange}
            >
              <option>Clothing</option>
              <option>Food & Drink</option>
              <option>Fitness</option>
              <option>Vehicles</option>
              <option>Accessories</option>
              <option>Furniture</option>
              <option>Electronics</option>
            </select>

            <label>Product quantity:</label>
            <input
              className='colInpt'
              type="number"
              name="productQuantity"
              value={editableProduct.productQuantity}
              onChange={handleInputChange}
            />
          </div>

          <h3>Product Details <i className="fa fa-indent"></i></h3>
          <p>Published by {productSeller?.userName} - {new Date(editableProduct.productDateOfListing).toLocaleDateString()}</p>
          <br />

          <label>Product description:</label>
          <textarea
            name="description"
            value={editableProduct.description}
            onChange={handleInputChange}
            rows="4"
            cols="50"
          />
          
          <button onClick={handleApplyChanges} className="btn12">Apply Changes</button>
          <button onClick={handleRemoveListing} className="btn12">Remove Listing</button>

          <div className="message-container">
            {message && (
              <p className={message.includes('deleted') ? 'pds' : 'psu'}>
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductShowcase;
