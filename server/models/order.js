const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;


const orderSchema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: 'Product'
    },
    seller: {
        type: ObjectId,
        ref: 'User'
    },
    buyer: {
        type: ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

mongoose.model('Order', orderSchema);

