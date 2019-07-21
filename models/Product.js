const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    img: {
        type: Schema.Types.ObjectId, // There is no need to create references here
        ref: 'uploads'
    },
    img_name: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    color: {
        type: String,
    },
    size: {
        type: String,
    },
    company: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    locations: {
        type: [String],
        required: true
    },
    category: {
        type: String,
        required: true
    },
    gender: {
        type: String,
    },
    featured: {
        type: Boolean,
        default: false
        
    },
    tags: {
        type: [String]
    }
});

module.exports = Product = mongoose.model('product', ProductSchema);