const mongoose = require('mongoose')
const { findOneAndUpdate } = require('./boothModel')
const booth = require('./boothModel')
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
        // minlength: 10,
        // maxlength: 10,
        default: null
    },

    yes: {
        type: Number,
        min: 0,
        max: 1,
        default: 0
    },
    no: {
        type: Number,

        min: 0,
        max: 1,
        default: 0
    },
    maybe: {
        type: Number,

        min: 0,
        max: 1,
        default: 0
    },
    abcParty: {
        type: Number,

        min: 0,
        max: 1,
        default: 0
    },
    otherParty: {
        type: Number,

        min: 0,
        max: 1,
        default: 0
    },
    // updatedBy: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "Users",
    //     //required: true
    // },
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

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamp: true,
})
voterListSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'createdBy',
        select: 'name'
    })
    next();
})

voterListSchema.statics.calculateTotalYes = async function (boothId) {
    console.log(boothId)
    const stats = await this.aggregate([
        {
            $match: { booth: boothId }
        },
        {
            $group: {
                _id: '$booth',
                yesVooter: { $sum: '$yes' },
                noVote: { $sum: '$no' },
                maybe: { $sum: '$maybe' },
                abcParty: { $sum: '$abcParty' },
                otherParty: { $sum: '$otherParty' },
                totalVote: {$sum: 1},


            }
        }
    ])
    console.log(stats)
    await booth.findByIdAndUpdate(boothId, {
            yes: stats[0].yesVooter,
            no: stats[0].noVote,
            maybe: stats[0].maybe,
            abc: stats[0].abcParty,
            other: stats[0].otherParty,
            totalVoter: stats[0].totalVote

        })


}

voterListSchema.post('save', function () {
    this.constructor.calculateTotalYes(this.booth);

})
voterListSchema.pre(/^findOneAnd/, async function (next) {
    this.v = await this.findOne();
    console.log(this.v);
    next();
    
})
findOneAndUpdate
voterListSchema.post(/^findOneAnd/, async function () {
    await this.v.constructor.calculateTotalYes(this.v.booth);
})




const Voters = mongoose.model('VoterList', voterListSchema)
module.exports = Voters


