const mongoose = require('mongoose')

const createBooth = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    voterId: {
        type: Number,
        required: true,
        unique: true,
    },
    age: {
        type: String,
        required: true,
    },
    sex: {
        type: String,
        required: true,
    },
    relation: {
        type: String,
        default:''
        
    },
    contact: {
        type: String,
        minlength: 10,
        maxlength: 10,
        default:''

        
    },
    updatedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "Users",
        required: true
    },


})