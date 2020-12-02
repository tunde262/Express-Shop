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
            collectionId: {
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
    prod_order: {
        type: Number
    },
    prod_views: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
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
            variantId: {
                type: Schema.Types.ObjectId,
                ref: 'variant'
            }
        }
    ]
});

module.exports = Product = mongoose.model('product', ProductSchema);