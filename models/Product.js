const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    store: {
        type: Schema.Types.ObjectId,
        ref: 'store'
    },
    locations: [
        {
            location: {
                type: Schema.Types.ObjectId,
                ref: 'darkstore'
            }
        }
    ],
    name: {
        type: String,
        required: true
    },
    img_gallery: [
        {
            img_id: {
                type: Schema.Types.ObjectId, // There is no need to create references here
                ref: 'uploads'
            },
            img_name: {
                type: String
            },
            img_order: {
                type: Number
            },
        }
    ],
    show_image: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 0
    },
    sale_price: {
        type: Number,
        default: 0
    },
    inventory_qty: {
        type: Number,
        default: 0
    },
    category: {
        type: String
    },
    collections: [
        {
            category: {
                type: Schema.Types.ObjectId,
                ref: 'category'
            }
        }
    ],
    tags: {
        type: [String]
    },
    sku: {
        type: String
    },
    description: {
        type: Schema.Types.Mixed
    },
    website_link: {
        type: String
    },
    visible: {
        type: Boolean
    },
    in_stock: {
        type: Boolean
    },
    condition: {
        type: String
    },
    featured: {
        type: Boolean
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
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user'
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
            var_id: {
                type: Schema.Types.ObjectId,
                ref: 'variant'
            },
            inventory_qty: {
                type: Number,
                default: 0
            },
            price: {
                type: Number,
                default: 0
            },
            sale_price: {
                type: Number,
                default: 0
            },
            sku: {
                type: String
            },
            color: {
                type: String
            },
            size: {
                type: String
            },
            weight: {
                type: String
            },
            type: {
                type: String
            },
            bundle: {
                type: String
            },
            scent: {
                type: String
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
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

module.exports = Product = mongoose.model('product', ProductSchema);