const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: "https://res.cloudinary.com/dh8zahoqm/image/upload/v1601638912/no-photo_g4g2o8.jpg"
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    isBuyer: {
        type: Boolean,
        default: true
    },
    admin: {
        type: Boolean,
        default:false
    }
});

mongoose.model('User', userSchema);

