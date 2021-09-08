const mongoose = require('mongoose')

const createBoothSchema = mongoose.Schema({
    boothName: {
        type: String,
        required: true,
        unique: true,
    },
    // voters: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'VoterList',
    //     required: true
    // }
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