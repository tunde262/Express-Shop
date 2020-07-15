const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DarkstoreSchema = new Schema({
    store: {
        type: Schema.Types.ObjectId,
        ref: 'store'
    },
    name: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    img: {
        type: mongoose.Schema.Types.ObjectId, // There is no need to create references here
        ref: 'uploads'
    },
    img_name: {
        type: String
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
    phone: {
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
    variants: [
        {
            variant: {
                type: Schema.Types.ObjectId,
                ref: 'variant'
            }
        }
    ],          
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = Darkstore = mongoose.model('darkstore', DarkstoreSchema);