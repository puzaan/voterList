const mongoose = require('mongoose')

// const PartySchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     photo: {
//         type: String,
//         required: true
//     },
//     willVote: {
//         type: Boolean,
//         required: true,
//         default: false
//     },
//     maybe: {
//         type: Boolean,
//         required: true,
//         default: false
//     },

//     // voter: {
//     //     type: mongoose.Schema.ObjectId,
//     //     ref: 'VoterList',
//     //     required: true
//     // },
//     updatedBy: {
//         type: mongoose.Schema.ObjectId,
//         ref: "Users",
//         //required: true
//     },
//     // createdBy: {
//     //     type: mongoose.Schema.ObjectId,
//     //     ref: 'Admins',
//     //     required: true
//     // },
// }, { timestamps: true })

// PartySchema.pre(/^find/, function (next) {
//     this.populate({
//         path: 'updatedBy',
//         select: 'name'
//     })
//     next();
// })


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
    voteTo: {
        type: String,
        default: '',
        
    },
    probility: {
        type: String,
        
        default: ''
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
    // voteTo: [PartySchema]
    // amla: {
    //     type: Number,
    //     default: 0,
        
    // },
    // abc: {
    //     type: Number,
    //     default: 0,
        
    // },
    // yes: {
    //     type: Number,
    //     default: 0,
        
    // },
    // no: {
    //     type: Number,
    //     default: 0,
        
    // },
    // maybe: {
    //     type: Number,
    //     default: 0,
        
    // },


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
        select:'boothName'
    })
    next();
})
// voterListSchema.virtual('party', {
//     ref: 'Partys',
//     foreignField: 'voter',
//     localField: '_id'
// })
const Voters = mongoose.model('VoterList', voterListSchema)
module.exports = Voters
