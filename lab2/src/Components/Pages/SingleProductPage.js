import React, { useEffect, useState } from 'react';
import ClientHeader from '../ClientComps/ClientHeader';
import ClientFooter from '../ClientComps/ClientFooter';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SmallProductCard from '../ClientComps/SmallProductCard';
import { jwtDecode } from 'jwt-decode';
import ProductShowcase from '../ClientComps/ProductShowcase';
import MyProductShowcase from '../ClientComps/MyProductShowcase';

function SingleProductPage({ cart, setCart }) {
  const { productId } = useParams(); 
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [productSeller, setProductSeller] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSeller, setIsSeller] = useState(false); // New state to track if the logged-in user is the seller

  const [er, setEr] = useState();
  const [ner, setNer] = useState();

  useEffect(() => {
    const token = localStorage.getItem('token');
    let decodedToken = null;

    if (token) {
      decodedToken = jwtDecode(token);
      setIsLoggedIn(decodedToken.exp * 1000 > Date.now());
    }

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
        setProduct(response.data);

        const userResponse = await axios.get(`http://localhost:5000/api/users/${response.data.seller}`);
        setProductSeller(userResponse.data);

        // Check if the logged-in user is the seller
        if (token && decodedToken && decodedToken.id === response.data.seller) {
          setIsSeller(true);
        }

        // After fetching the product, fetch related products
        const productsResponse = await axios.get('http://localhost:5000/api/products');
        const filteredProducts = productsResponse.data
          .filter(p => p.productCategory === response.data.productCategory && p._id !== response.data._id) // Filter by category and exclude the current product
          .slice(0, 4); // Limit to 4 products
        setRelatedProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching product or related products:', error);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleAddToCart = async (product) => {
    if (!isLoggedIn) {
        navigate('/account', { state: { message: 'You have to be logged in to add something to cart' } });
        return;
    }

    const quantityInput = document.getElementById('quantityInput');
    const quantity = parseInt(quantityInput.value);

    if (quantity > 0 && quantity <= product.productQuantity) {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        try {
            // Use the PUT API to merge quantities in the cart
            await axios.put('http://localhost:5000/api/cart/merge', {
                userId: userId,
                productId: product._id,
                quantity: quantity
            });

            setEr(null); // Clear the error message
            setNer('Added to cart!'); // Show the success message

        } catch (error) {
            console.error('Error adding to cart:', error);
            setEr('Failed to add to cart');
        }
    } else {
        if (quantity > product.productQuantity) {
            setEr('Quantity exceeds available stock');
        } else {
            setEr('Invalid quantity');
        }
    }
};

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='container1'>
        <ClientHeader />
      </div>

      {isSeller ? (
        <MyProductShowcase
          product={product} // Pass the product data
          productSeller={productSeller} // Pass the seller data
          handleAddToCart={handleAddToCart} // Function to handle adding to cart
          er={er} // Error message if any
          ner={ner} // Success message if any
        />
      ) : (
        <ProductShowcase
          product={product} // Pass the product data
          productSeller={productSeller} // Pass the seller data
          handleAddToCart={handleAddToCart} // Function to handle adding to cart
          er={er} // Error message if any
          ner={ner} // Success message if any
        />
      )}

      <div className="container1">
        <div className="row1 row1-2">
          {relatedProducts.length > 0 && (
            <h2>Related Products</h2>
          )}
          <a href="/shop">
            <p>Back to shop</p>
          </a>
        </div>

        <div className='small-container1'>
          {relatedProducts.map((relatedProduct) => (
            <div className='row1' key={relatedProduct._id}>
              <SmallProductCard product={relatedProduct} />
            </div>
          ))}
        </div>
      </div>

      <ClientFooter />
    </>
  );
}

export default SingleProductPage;
