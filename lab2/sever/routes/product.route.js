const express = require('express');
const router = express.Router();
const {getProducts , getProductById , createProduct , updateProductById , deleteProductById} = require('../controllers/product.controller.js');

// GET all users
router.get('/', getProducts);

// GET a single user by ID
router.get('/:id', getProductById);

// POST a new user
router.post('/', createProduct);

// PUT (update) a user by ID
router.put('/:id', updateProductById);

// DELETE a user by ID
router.delete('/:id', deleteProductById);

module.exports = router;
