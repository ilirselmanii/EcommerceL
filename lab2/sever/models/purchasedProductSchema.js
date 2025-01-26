const mongoose = require('mongoose');

const purchasedProductSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    quantityPurchased: { type: Number, required: true },
    productDateOfPurchase: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PurchasedProduct', purchasedProductSchema);
