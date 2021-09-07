const mongoose = require('mongoose')

const PartySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    photo: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true,
        default: 0
    }
},{ timestamps: true })

const Party = mongoose.model('Partys', PartySchema);
module.exports = Party