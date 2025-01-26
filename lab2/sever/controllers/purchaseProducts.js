const { Pool } = require('pg');  // PostgreSQL
const Product = require('../models/product.model.schema');
const PurchasedProduct = require('../models/purchasedProduct.model.schema');

// Initialize PostgreSQL pool connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ecommerce-website',
    password: 'familjamorina',
    port: 5432,
});

exports.purchaseProducts = async (req, res) => {
    try {
        const userId = req.user.id; 
        const client = await pool.connect();

        // Log the received request data
        console.log("User ID:", userId);
        console.log("Request Body:", req.body);

        // Fetch cart data from PostgreSQL for the logged-in user
        const cartResult = await client.query('SELECT * FROM user_carts WHERE user_id = $1', [userId]);
        const cartItems = cartResult.rows;

        // Log the cart items fetched from PostgreSQL
        console.log("Cart Items from PostgreSQL:", cartItems);

        if (cartItems.length === 0) {
            console.log("Cart is empty, no purchase to process.");
            return res.status(400).json({ message: 'Cart is empty.' });
        }

        for (const cartItem of cartItems) {
            try {
                const { product_id: productId, quantity } = cartItem;

                // Log productId and quantity to debug the cart item being processed
                console.log(`Processing Product ID: ${productId}, Quantity: ${quantity}`);

                const product = await Product.findById(productId);

                if (!product) {
                    console.log(`Product not found: ${productId}`);
                    return res.status(404).json({ message: `Product not found: ${productId}` });
                }

                if (product.productQuantity < quantity) {
                    console.log(`Insufficient stock for ${product.productName}`);
                    return res.status(400).json({ message: `Insufficient stock for ${product.productName}` });
                }

                // Update product stock and log the changes
                product.productQuantity -= quantity;
                await product.save();
                console.log(`Stock updated for Product ID: ${productId}, New Quantity: ${product.productQuantity}`);

                // Create PurchasedProduct instance and save it
                const purchasedProduct = new PurchasedProduct({
                    product: product._id,
                    buyer: userId, 
                    quantityPurchased: quantity,
                    productDateOfPurchase: Date.now(),
                });

                await purchasedProduct.save();
                console.log(`Purchased Product saved: Product ID: ${productId}`);

                // Remove the product from the cart in PostgreSQL
                await client.query('DELETE FROM user_carts WHERE user_id = $1 AND product_id = $2', [userId, productId]);
                console.log(`Deleted Product ID: ${productId} from the cart`);
            } catch (err) {
                console.error('Error processing cart item:', err);
                return res.status(500).json({ message: 'Error processing cart item' });
            }
        }

        client.release();
        res.status(200).json({ message: 'Purchase successful!' });

    } catch (error) {
        console.error('Error processing purchase:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
