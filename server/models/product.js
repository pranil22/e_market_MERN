const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        default: "https://res.cloudinary.com/dh8zahoqm/image/upload/v1601638912/no-photo_g4g2o8.jpg"
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    category: {
        type: String
    },
    seller: {
        type: ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

mongoose.model('Product', productSchema);


