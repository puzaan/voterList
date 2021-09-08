const mongoose = require('mongoose')

const voterListSchema = mongoose.Schema({
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
        default: ''

    },
    contact: {
        type: Number,
        minlength: 10,
        maxlength: 10,
        default: null


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
    booth: {
        type: mongoose.Schema.ObjectId,
        ref: 'Booths',
        required: true
    },
    // party: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'Partys',
    //     required: true
    // }

},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamp: true,
})
voterListSchema.pre(/^find/, function (next){
    this.populate({
        path:'updatedBy',
        select:'name'
    }).populate({
        path: 'createdBy',
        select: 'name'
    }).populate({
        path: 'booth', 
    })
    next();
})
voterListSchema.virtual('party', {
    ref: 'Partys',
    foreignField: 'voter',
    localField: '_id'
})
const Voters = mongoose.model('VoterList', voterListSchema)
module.exports = Voters