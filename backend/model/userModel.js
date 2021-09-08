const mongoose = require('mongoose')
const bscrypt = require('bcryptjs')
const validator = require('mongoose-validator')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    sex: {
        type: String,
        required: true,

    },
    dob: {
        type: Date,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 16,
    },
    phone: {
        type: Number,
        required: true,
        minlength: 10,
        maxlength: 10,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        validate: [
            validator({
                validator: 'isEmail',
                message: 'please enter valid email'
            })
        ],
        required: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: false
    }
},

    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    },

    {
    timestamps: true
    }
)

UserSchema.virtual('assined', {
    ref: 'AssignedPlace',
    foreignField: "user",//find all related assigned by which match this id of user
    localField: '_id'

})

// if creating new user this function helps to convert enter password into hass type password
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bscrypt.genSalt(10);
    this.password = await bscrypt.hash(this.password, salt)
    next()
})

// this function is used to convert hass password into actual password and matc if password is correct or not
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bscrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model('Users', UserSchema);
module.exports = User