const mongoose = require('mongoose');

const DarkstoreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        address: {
            type:String,
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
    items: [
        {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'variant'
        }
    ],          
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = Darkstore = mongoose.model('darkstore', DarkstoreSchema);