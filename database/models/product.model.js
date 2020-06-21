const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String
    },
    quantity: {
        type: Number
    },
    image_url: {
        type: String
    },
    _id_partner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Partner'
    }
})

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;