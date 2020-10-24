const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    gender: {
        type: String
    },
    birthday: {
        month: {
            type: String
        },
        day: {
            type: Number
        },
        year: {
            type: Number
        },
    },
    stores: [
        {
            store: {
                type: Schema.Types.ObjectId,
                ref: 'store'
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
    address_book: [
        {
            address_name: {
                type: String,
                required: true
            },
            first_name: {
                type: String,
                required: true
            },
            last_name: {
                type: String,
                required: true
            },
            address_1: {
                type: String,
                required: true
            },
            address_2: {
                type: String
            },
            city: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            country: {
                type: String,
                required: true
            },
            zipcode: {
                type: String,
                required: true
            },
            phone: {
                type: String
            },
            delivery_instructions: {
                type: String
            },
            active: {
                type: Boolean,
                default: false
            },
        }
    ],
    notifications: [
        {
            store: {
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
    totals: {
        total_orders: {
            type: Number
        },
        total_spent: {
            type: Number
        },
    },
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: 'order'
        }
    ],
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);