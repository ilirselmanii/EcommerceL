require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Get your secret key from the Stripe Dashboard
const router = express.Router();

router.post('/api/checkout/create-session', async (req, res) => {
  const { cartItems, userId } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.productName,
          },
          unit_amount: item.productPrice * 100, // Price in cents
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: 'http://localhost:3000/successPage',
      cancel_url: 'http://localhost:3000/myCart',
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    res.status(500).json({ error: 'Failed to create Stripe session' });
  }
});

module.exports = router;
