const mongoose = require('mongoose');
const{Timestamp} = require("mongodb");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require:true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    dob: {
        type: Date,
        require: true,
    },
    sex: {
        type: String,
        require: true,
    }
},{
    timestamps:true
})

const User = mongoose.model('User', userSchema);

module.exports = User;