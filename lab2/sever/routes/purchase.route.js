const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchase.controller');
const authMiddleware = require('../middleware/authMiddleware'); 

// Check for errors in the middleware
router.post('/purchase', async (req, res, next) => {
  try {
    await authMiddleware(req, res, next); // Use await if middleware is asynchronous
  } catch (error) {
    console.error('Error in authMiddleware:', error);
    return res.status(500).json({ message: 'Internal server error' }); // Handle middleware errors
  }
});

// Route handler will receive a verified user object in req.user
router.post('/purchase', purchaseController.purchaseProducts);

module.exports = router;