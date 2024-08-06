const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        default: 0,
    },
    cart: {
        type: Array,
        default: [],
    }
},{
    timestamps : true
});

// Compile the schema into a model
const Users = mongoose.model('User', userSchema);

// Export the model
module.exports = Users;
