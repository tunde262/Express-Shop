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
        type: [String]
    },
    location_tags: {
        type: [String],
    },
    img: {
        type: mongoose.Schema.Types.ObjectId, // There is no need to create references here
        ref: 'uploads'
    },
    img_name: {
        type: String
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
        required: true
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
        required: true
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
            type: Schema.Types.ObjectId,
            ref: 'variant'
        }
    ],          
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = Darkstore = mongoose.model('darkstore', DarkstoreSchema);