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
    variants: [
        {
            type: [Schema.Types.ObjectId],
            ref: 'variant'
        }
    ],          
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = Darkstore = mongoose.model('darkstore', DarkstoreSchema);