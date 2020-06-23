const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String
    },
    quantity: {
        type: String
    },
    quantity_unit: {
        type: String
    },
    unit_price: {
        type: Number
    },
    image_url: {
        type: String
    },
    partner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Partner'
    }
})

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;