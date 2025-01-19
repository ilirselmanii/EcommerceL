import React, { useState } from 'react';
import productImage from '../images/product-7.jpg';
import SmallProductCard from '../ClientComps/SmallProductCard'
import { jwtDecode } from 'jwt-decode';

const getToken = () => localStorage.getItem('token');

const getUserIdFromToken = () => {
  const token = getToken();
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.id; // Assuming `id` is the key in your token payload
  }
  return null;
};

function AccountPost({ userProducts } ) {

  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('Clothing');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null)

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Preview the image as a base64 string
      };
      setSelectedFile(file); // Store the actual file for uploading to Cloudinary
    }
  };
  // State to toggle the visibility of postPanel and pWorkHolder
  const [isPanelVisible, setIsPanelVisible] = useState(false);

  // Handle button click to show the panels
  const handleAddProductClick = () => {
    setIsPanelVisible(true);
  };

  const handleCloseAddProductPanel = () => {
    setIsPanelVisible(false);
  }

  const handleCreateListing = async () => {
    const token = getToken();
    const userId = getUserIdFromToken();

    const preset_key = 'ecommerce_images'; // Make sure this preset is valid
    const cloud_name = 'diw1dnseq';
  
    if (!token || !userId) {
      console.error('Token or user ID is missing');
      return;
    }
  
    let productImageUrl = image || null; // Default to base64 or existing image if any

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
        productImageUrl = cloudinaryData.secure_url; // Get the secure URL for the uploaded image
      } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        return;
      }
    }
  
    const productData = {
      productName,
      productCategory: category,
      productQuantity: quantity, // Send as string if that's how it's required
      productPrice: price,       // Send as string if that's how it's required
      seller: userId,
      description,
      productImage: productImageUrl // Use the Cloudinary image URL or base64 image
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });
  
      if (!response.ok) {
        const errorDetails = await response.json();
        console.error('Server error:', errorDetails);
        throw new Error('Error creating product');
      }
  
      const data = await response.json();
      console.log('Product created:', data);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const filteredProducts = userProducts.filter(product => product.productQuantity > 0);

  return (
    <div className='createListingMP'>
      {isPanelVisible && (
        <div className='pWorkHolder'>
        <div className='postWorkPanel'>
          <div className='postRow1'>
            <div className='postImage'>
              <img src={image || productImage} alt="Product" />
              <button className='cbtn' onClick={() => document.getElementById('getFile').click()}>
                Upload Image
              </button>
              <input
                type="file"
                id="getFile"
                style={{ display: 'none' }}
                onChange={handleImageUpload}
              />
            </div>
            <div className='postMainInputs'>
              <div className='pmInput'>
                <label>Name of Product:</label>
                <input
                  type='text'
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div className='pmInput'>
                <label>Category:</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option>Clothing</option>
                  <option>Food & Drink</option>
                  <option>Fitness</option>
                  <option>Vehicles</option>
                  <option>Accessories</option>
                  <option>Furniture</option>
                  <option>Electronics</option>
                </select>
              </div>
              <div className='pmInput'>
                <label>Units to be sold:</label>
                <input
                  type='text'
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className='pmInput'>
                <label>Price for one: ($)</label>
                <input
                  type='text'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className='postRow2'>
            <label>Product Description:</label>
            <textarea
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className='postRow3'>
            <button className='go-back' onClick={handleCloseAddProductPanel}>Return</button>
            <button className='createLisBtn' onClick={handleCreateListing}>
              Create Listing
            </button>
          </div>
        </div>
      </div>
      )}

      {isPanelVisible && <div className='postPanel'></div>}

      <h1>Currently being listed by you:</h1>

      <div className='productReel'>
        <button className='addProductBtn' onClick={handleAddProductClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            className="bi bi-bag-plus"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5"
            />
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
          </svg>
        </button>
        {filteredProducts.length === 0 ? (
          <p>No products listed yet.</p>
        ) : (
          filteredProducts.map((product) => (
            <SmallProductCard key={product._id} product={product} />
          ))
        )} 
      </div>
    </div>
  );
}

export default AccountPost;