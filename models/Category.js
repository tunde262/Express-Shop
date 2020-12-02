const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    store: {
        type: Schema.Types.ObjectId,
        ref: 'store'
    },
    profiles: [
        {
            profile: {
                type: Schema.Types.ObjectId,
                ref: 'profile'
            }
        }
    ],
    name: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    visible: {
        type: Boolean
    },
    cat_order: {
        type: Number
    },
    view_count: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            date: {
                type: Date,
                default: Date.now
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
    items: [
        {
            item: {
                type: Schema.Types.ObjectId,
                ref: 'product'
            }
        }
    ]
});

module.exports = Category = mongoose.model('category', CategorySchema);