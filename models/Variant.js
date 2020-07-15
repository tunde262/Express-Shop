const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const VariantSchema = new Schema({
    store: {
        type: Schema.Types.ObjectId,
        ref: 'store'
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'product'
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    tags: {
        type: [String]
    },
    img: {
        type: Schema.Types.ObjectId, // There is no need to create references here
        ref: 'uploads'
    },
    img_name: {
        type: String
    },
    sku: {
        type: String
    },
    inventory_qty: {
        type: Number
    },
    price: {
        type: Number,
    },
    sale_price: {
        type: String
    },
    visible: {
        type: Boolean,
        default: true
    },
    in_stock: {
        type: Boolean
    },
    website_link: {
        type: String
    },
    condition: {
        type: String
    },
    color: {
        type: String
    },
    size: {
        type: String,
    },
    weight: {
        type: String,
    },
    bundle: {
        type: String,
    },
    type: {
        type: String,
    },
    scent: {
        type: String,
    },
    fit: {
        type: String
    },
    flavor: {
        type: String
    },
    material: {
        type: String
    },
    activity: [
        {
            title: {
                type: String
            },
            text: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    locations: [
        {
            darkstore: {
                type: Schema.Types.ObjectId,
                ref: 'darkstore'
            },
            qty: {
                type: Number
            },
            price: {
                type: Number
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
    ]
});

module.exports = Variant = mongoose.model('variant', VariantSchema);