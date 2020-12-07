const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
    profiles: [
        {
            profile: {
                type: Schema.Types.ObjectId,
                ref: 'profile'
            }
        }
    ],
    img: {
        type: Schema.Types.ObjectId, // There is no need to create references here
        ref: 'uploads'
    },
    img_name: {
        type: String
    },
    banner_imgs: [
        {
            img_id: {
                type: Schema.Types.ObjectId, // There is no need to create references here
                ref: 'uploads'
            },
            img_name: {
                type: String
            },
        }
    ],
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    tags: {
        type: [String]
    },
    stripe_id: {
        type: String
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'product'
        }
    ],
    customers: [
        {
            customer: {
                type: Schema.Types.ObjectId,
                ref: 'customer'
            }
        }
    ],
    notifications: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            customer: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            order: {
                type: Schema.Types.ObjectId,
                ref: 'order'
            },
            product: {
                type: Schema.Types.ObjectId,
                ref: 'product'
            },
            variant: {
                type: Schema.Types.ObjectId,
                ref: 'variant'
            },
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
    order_value: {
        type: Number
    },
    view_num: {
        type: Number,
        default: 0
    },
    view_count: [
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
    favorites: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ],
    reviews: [
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
    social: {
        youtube: {
            type: String,
        },
        twitter: {
            type: String,
        },
        facebook: {
            type: String,
        },
        instagram: {
            type: String,
        },
        website: {
            type: String
        }
    },
    show_banner: {
        type: Boolean,
        default: true
    },
    privacy: {
        type: Boolean,
        default: true
    },
    passcode: {
        type: String
    },
    // enable_prod_comments: {

    // },
    // enable_prod_photos: {

    // },
    // enable_prod_locations: {

    // },
    taxes_in_prod: {
        type: Boolean,
        default: true
    },
    delivery_cost_customers: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = Store = mongoose.model('store', StoreSchema);