const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    img: {
        type: mongoose.Schema.Types.ObjectId, // There is no need to create references here
        ref: 'uploads'
    },
    img_name: {
        type: String
    },
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
    status: {
        type: String,
        required: true
    },
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
        linkedin: {
            type: String,
        },
        instagram: {
            type: String,
        },
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = Store = mongoose.model('store', StoreSchema);