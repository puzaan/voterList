const mongoose = require('mongoose')

const PartySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true
    },
    willVote: {
        type: Boolean,
        required: true,
        default: false
    },
    maybe:{
        type: Boolean,
        required: true,
        default:false
    },

    voter:{
        type: mongoose.Schema.ObjectId,
        ref:'VoterList',
        required: true
    },
    updatedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "Users",
        //required: true
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'Admins',
        required: true
    },
},{ timestamps: true })

PartySchema.pre(/^find/, function (next) {
    this.populate({
        path: 'updatedBy',
        select: 'name'
    }).populate({
        path: 'createdBy',
        select: 'name'
    }).populate({
        path: 'voter',
        select:'name voterId'
    })
    next();
})



const Party = mongoose.model('Partys', PartySchema);
module.exports = Party