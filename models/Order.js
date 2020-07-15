const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    store: {
        type: Schema.Types.ObjectId,
        ref: 'store'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'customer'
    },
    cart: {
        type: Object, 
        required: true
    },
    status: {
        type: String,
        default:'new order'
    },
    address: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state:{
            type: String,
            required: true
        },
        zipcode: {
            type: String,
            required: true
        }
    },
    telephone: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    paymentId: {
        type: String,
        required: true
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
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Order = mongoose.model('order', OrderSchema);