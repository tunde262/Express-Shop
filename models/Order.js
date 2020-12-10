const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    stores: [
        {
            store: {
                type: Schema.Types.ObjectId,
                ref: 'store'
            }
        }
    ],
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
    
    address_name: {
        type: String,
    },
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    location: {
        type: {
            type: String,
            default: "Point"
        },
        coordinates: {
            type: [Number]
        } 
    },
    formatted_address: {
        type: String,
    },
    address_components: {
        street_name: {
            type: String
        },
        street_number: {
            type: String
        },
        city: {
            type: String
        },
        state:{
            type: String
        },
        country: {
            type: String
        },
        postalcode: {
            type: String
        },
        area: {
            type: String,
        }
    },
    placeId: {
        type: String,
    },
    address_2: {
        type: String
    },
    phone: {
        type: String
    },
    delivery_instructions: {
        type: String
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