const mongoose = require('mongoose')

const createBoothSchema = mongoose.Schema({
    boothName: {
        type: String,
        required: true,
        unique: true,
    },
    amla: {
        type: Number,
        default: 0,

    },
    abc: {
        type: Number,
        default: 0,

    },

    other: {
        type: Number,
        default: 0,

    },
    yes: {
        type: Number,
        default: 0,

    },
    no: {
        type: Number,
        default: 0,

    },
    maybe: {
        type: Number,
        default: 0,

    },
    totalVoter: {
        type: Number,
        default: 0,
        
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamp: true,
})

createBoothSchema.virtual('voter', {
    ref: 'VoterList',
    foreignField: "booth",//find all related assigned by which match this id of user
    localField: '_id'

})

const Booths = mongoose.model("Booths", createBoothSchema)
module.exports = Booths