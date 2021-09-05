const mongoose = require('mongoose')

const assignedPlaceSchema = new mongoose.Schema({
    provision: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    fedConstituency: {
        type: String,
        required: true,
    },
    provConstituency: {
        type: String,
        required: true,
    },
    localBody: {
        type: String,
        required: true,
    },
    ward: {
        type: String,
        required: true,
    },
    booth:[Object],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "Users",
        required: true
    },
    Adminuser: {
        type: mongoose.Schema.ObjectId,
        ref: 'Admins',
        required: true
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamp: true,
}
)

assignedPlaceSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'Adminuser',
        select:'name'
    }).populate({
        path: 'user',
        select:'name'
    })
    next();
})



const AssignedPlace = mongoose.model("AssignedPlace", assignedPlaceSchema)
module.exports = AssignedPlace;