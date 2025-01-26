require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors package
const cloudinary = require('cloudinary').v2;
const userRoutes = require('./routes/user.route');
const productRoutes = require('./routes/product.route');
const purchasedProductRoutes = require('./routes/purchasedProduct.route');
const purchaseRoutes = require('./routes/purchase.route');
const app = express();
const port = 5000;

//POSTGRESS
const postgresRoute = require('./routes/Postgress.route');

//STRIPE
const stripeRoute = require('./routes/stripe.route');

// MIDDLEWARE
app.use(express.json());

// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// ROUTES
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/purchasedProducts', purchasedProductRoutes);
app.use('/api/purchases', purchaseRoutes);

//ROUTES FOR POSTGRES

app.use('/', postgresRoute);

//ROUTE FOR STRIPE
app.use('/', stripeRoute);

// Connect to MongoDB and start the server
mongoose.connect("mongodb+srv://andiyt72:3HFpHG4SnaXYyLZQ@lab2test.tlxmt3t.mongodb.net/lab2test?retryWrites=true&w=majority&appName=lab2test")
.then(() => {
    console.log('Connected to the database');
    app.listen(port, () => {
        console.log('Server is running on port ' + port);
    });
})
.catch(() => {
    console.log('Connection to database failed');
});
