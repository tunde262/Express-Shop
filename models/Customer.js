const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    has_account: {
        type: Boolean,
        default: false
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    name: [
        {
            firstname: {
                type: String
            },
            lastname: {
                type: String
            },
            store: {
                type: Schema.Types.ObjectId,
                ref: 'store'
            },
        }
    ],
    address_book: [
        {
            store: {
                type: Schema.Types.ObjectId,
                ref: 'store'
            },
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
    notes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            store: {
                type: Schema.Types.ObjectId,
                ref: 'store'
            },
            text: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            },
        }
    ],
    tags: [
        {
            tags: {
                type: [String]
            },
            store: {
                type: Schema.Types.ObjectId,
                ref: 'store'
            }
        }
    ],
    totals: [
        {
            total_orders: {
                type: Number
            },
            total_spent: {
                type: Number
            },
            store: {
                type: Schema.Types.ObjectId,
                ref: 'store'
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
            },
            store: {
                type: Schema.Types.ObjectId,
                ref: 'store'
            }
        }
    ],
    creation_date: [
        {
            date: {
                type: Date,
                default: Date.now
            },
            store: {
                type: Schema.Types.ObjectId,
                ref: 'store'
            }
        }   
    ]
});

module.exports = Customer = mongoose.model('customer', CustomerSchema);

