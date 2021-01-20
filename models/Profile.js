const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    gender: {
        type: String
    },
    birthday: {
        month: {
            type: String
        },
        day: {
            type: Number
        },
        year: {
            type: Number
        },
    },
    recommendation_tags: {
        type: [String]
    },
    registration_complete: {
        type: Boolean,
        default: false
    },
    stores: [
        {
            store: {
                type: Schema.Types.ObjectId,
                ref: 'store'
            }
        }
    ],
    recent_store: {
        type: Schema.Types.ObjectId,
        ref: 'store'
    },
    img: {
        type: Schema.Types.ObjectId, // There is no need to create references here
        ref: 'uploads'
    },
    img_name: {
        type: String
    },
    address_book: [
        {
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
            active: {
                type: Boolean,
                default: false
            },
        }
    ],
    categories: [
        {
            category: {
                type: Schema.Types.ObjectId,
                ref: 'category'
            }
        }
    ],
    notifications: [
        {
            store: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            order: {
                type: Schema.Types.ObjectId,
                ref: 'order'
            },
            product: {
                type: Schema.Types.ObjectId,
                ref: 'product'
            },
            variant: {
                type: Schema.Types.ObjectId,
                ref: 'variant'
            },
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
    totals: {
        total_orders: {
            type: Number
        },
        total_spent: {
            type: Number
        },
    },
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: 'order'
        }
    ],
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);