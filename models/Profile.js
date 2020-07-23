const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
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
            name: {
                type: String,
            },
            street: {
                type: String,
            },
            city: {
                type: String,
            },
            state: {
                type: String,
            },
            zipcode: {
                type: Number,
            },
            apartment_number: {
                type: Number
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