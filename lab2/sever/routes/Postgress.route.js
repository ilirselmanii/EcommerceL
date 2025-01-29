const express = require('express');
const { Pool } = require('pg'); // PostgreSQL
const router = express.Router();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ecommerce-website',
  password: 'familjamorina',
  port: 5432,
});

router.get('/api/cart/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM user_carts WHERE user_id = $1', [userId]);
      client.release();
      res.status(200).json({ cart: result.rows });
    } catch (error) {
      res.status(500).send('Error retrieving cart');
    }
});
  
router.post('/api/cart/save', async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
      const client = await pool.connect();
      await client.query('INSERT INTO user_carts (user_id, product_id, quantity) VALUES($1, $2, $3)', [userId, productId, quantity]);
      client.release();
      res.status(200).send('Item added to cart.');
    } catch (error) {
      res.status(500).send('Error adding the item to cart');
    }
});
  
router.delete('/api/cart/:userId/:productId', async (req, res) => {
    const { userId, productId } = req.params;
    console.log("Deleting item with User ID:", userId, "and Product ID:", productId); // Debugging log
    try {
      const client = await pool.connect();
      const result = await client.query('DELETE FROM user_carts WHERE user_id = $1 AND product_id = $2', [userId, productId]);
      client.release();
      
      if (result.rowCount === 0) {
        return res.status(404).send('Item not found');
      }

      res.status(200).send('Item removed from cart.');
    } catch (error) {
      res.status(500).send('Error removing the item from cart');
    }
});


router.put('/api/cart/merge', async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        const client = await pool.connect();
        
        // Check if the product already exists in the user's cart
        const result = await client.query('SELECT quantity FROM user_carts WHERE user_id = $1 AND product_id = $2', [userId, productId]);

        if (result.rows.length > 0) {
            // If the product exists, update the quantity by adding the new quantity to the existing one
            const newQuantity = result.rows[0].quantity + quantity;
            await client.query('UPDATE user_carts SET quantity = $1 WHERE user_id = $2 AND product_id = $3', [newQuantity, userId, productId]);
        } else {
            // If the product does not exist, insert a new cart item
            await client.query('INSERT INTO user_carts (user_id, product_id, quantity) VALUES($1, $2, $3)', [userId, productId, quantity]);
        }

        client.release();
        res.status(200).send('Cart updated.');
    } catch (error) {
        res.status(500).send('Error updating the cart.');
    }
});

router.put('/api/cart/update-quantity', async (req, res) => {
    const { userId, productId, newQuantity } = req.body;
  
    try {
      const client = await pool.connect();
      const result = await client.query('UPDATE user_carts SET quantity = $1 WHERE user_id = $2 AND product_id = $3', [newQuantity, userId, productId]);
      client.release();
  
      res.status(200).send('Quantity updated');
    } catch (error) {
      console.error('Error updating quantity:', error);
      res.status(500).send('Failed to update quantity');
    }
  });  

module.exports = router;
