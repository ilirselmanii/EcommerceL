import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode} from 'jwt-decode';

const SuccessPage = ({ setCart }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handlePostPurchase = async () => {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
  
      try {
        console.log("Token:", token);
        console.log("User ID:", userId);
  
        const { data: cartData } = await axios.get(`http://localhost:5000/api/cart/${userId}`);
        const cartItems = cartData.cart;
  
        console.log("Cart Items:", cartItems);
  
        const purchaseResponse = await axios.post(
          'http://localhost:5000/api/purchases/purchase',
          { cart: cartItems, userId },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log('Purchase:' ,purchaseResponse);
  
        setCart([]);
      } catch (error) {
        console.error('Error during purchase process:', error);
      }
    };
  
    handlePostPurchase();

    // Redirect to /shop after 5 seconds
    const redirectTimer = setTimeout(() => {
      navigate('/shop');
    }, 5000);

    return () => clearTimeout(redirectTimer);
  }, [setCart, navigate]);
  
  
  return (
    <div className='scss'>
      <h1>Payment Successful!</h1>
      <h3>Your purchase was successful. Thank you for your order!</h3>
      <p>You will be redirected shortly...</p>
    </div>
  );
};

export default SuccessPage;
