const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
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
    visible: {
        type: Boolean
    },
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