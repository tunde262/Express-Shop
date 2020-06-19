const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
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
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
    },
    qty: {
        type: Number
    },
    tags: {
        type: [String]
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    varInfo: [
        {
            var1: {
                type: [String],
                required: true
            },
            var2: {
                type: [String],
            },
            var3: {
                type: [String],
            },
            var4: {
                type: [String],
            },
        }
    ],
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    variants: [
        {
            type: Schema.Types.ObjectId,
            ref: 'variant'
        }
    ]
});

module.exports = Product = mongoose.model('product', ProductSchema);