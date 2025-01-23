import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const CheckoutForm = ({ cart }) => {
const stripe = useStripe();
const elements = useElements();

const handlePurchase = async () => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    try {
    const { data: session } = await axios.post('http://localhost:5000/api/checkout/create-session', {
        cartItems: cart,
        userId,
    });

    const result = await stripe.redirectToCheckout({
        sessionId: session.id,
    });

    if (result.error) {
        console.error(result.error.message);
    }
    } catch (error) {
    console.error('Error during checkout:', error);
    }
};

return (
    <button onClick={handlePurchase}>Proceed with Purchase</button>
);
};

export default CheckoutForm;