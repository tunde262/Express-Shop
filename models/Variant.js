const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const VariantSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'product'
    },
    img: {
        type: Schema.Types.ObjectId, // There is no need to create references here
        ref: 'uploads'
    },
    img_name: {
        type: String
    },
    sku: {
        type: String
    },
    variants: {
        var1: {
            type: String
        },
        var2: {
            type: String
        },
        var3: {
            type: String
        },
        var4: {
            type: String
        }
    },
    location: [
        {
            darkstore: {
                type: Schema.Types.ObjectId,
                ref: 'darkstore'
            },
            qty: {
                type: Number
            },
            price: {
                type: Number
            },
        }
    ]
});

module.exports = Variant = mongoose.model('variant', VariantSchema);