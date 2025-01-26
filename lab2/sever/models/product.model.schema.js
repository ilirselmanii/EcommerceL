const mongoose = require('mongoose');

const maxWords = 40;

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    productCategory: { type: String, required: true },
    productQuantity: { type: Number, required: true },
    productPrice: { type: Number, required: true },
    productImage: { 
      type: String,
      default: 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg',
      required: false
  },
    productDateOfListing: { type: Date, default: Date.now },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    description: {
        type: String,
        validate: [
          function(value) { return value.trim().split(/\s+/).length <= maxWords; },
          `Description cannot contain more than ${maxWords} words.`
        ]
    }
});

module.exports = mongoose.model('Product', productSchema);
