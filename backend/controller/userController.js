const catchAsync = require('express-async-handler')
const User = require('../model/userModel');
const { generateUserToken} = require('../utils/generateToken');
const handler = require('./handlerController')

const createUser = catchAsync(async (req, res, next)=> {
    const {name,sex,dob,password,phone,address,email} = req.body

    const userExist = await User.findOne({email})
    if(userExist){
        res.send(400)
        throw new Error('user exist ')
    }

    const user = await User.create({
        name,
        sex,
        dob,
        password,
        phone,
        address,
        email
    })

    if(user){
        res.status(201);
        res.json({
            _id: user.id,
            name: user.name,
            dob:user.dob,
            phone: user.phone,
            address:user.address,
            email:user.email,
            token: generateUserToken(user.id),
        })
    }else{
        res.status(400)
        throw new Error('Invalied user data')
    }
})


const login = catchAsync(async(req, res, next)=> {
    const {email, password}= req.body;

    const user = await User.findOne({email})
    if(user && (await user.matchPassword(password))){
        return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateUserToken(user._id)
        })
    }else{
        res.status(401);
        throw new Error ('Not authorized user')
    }
})

// const admins = catchAsync(async (req, res) => {
//     // parse data from req body
//     const { email, password } = req.body;

//     // find user if it exist in database 

//     const user = await User.findOne({ email })

//     if (user && (await user.matchPassword(password) && user.isAdmin === true)) {
//         return res.json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             isAdmin: user.isAdmin,
//             token: generateToken(user._id)

//         })
//     } else {
//         res.status(401);
//         throw new Error('Not authorized user as admin or invalid Email or Password')
//     }

// })

const getAllUser = catchAsync(async (req, res, next) => {
    const user = await User.find().populate('assined')
    res.json(user)
})


const getUserProfile = catchAsync(async (req, res) => {
    const user = await User.findById(req.params.id).populate('assined');
    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error('User belong to this token is no longer exist')
    }
})

// const getOwnProfile = catchAsync(async (req, res) => {
//     const user = await User.findById(req.user._id).populate('assined');
//     if (user) {
//         res.json(user);
//     } else {
//         res.status(404);
//         throw new Error('User belong to this token is no longer exist')
//     }
// })



const getOwnProfile = catchAsync(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error('User belong to tis token is no longer exist')
    }
})


const deleteUser = handler.deleteOne(User);





const Party = require('../model/partyModel');

const createParty = catchAsync(async (req, res, next) => {
    try {
        const { name } = req.body

        const existParty = await Party.findOne({ name })
        if (existParty) {
            res.status(400)
            throw new Error('Party name already exist')
        }
        const party = new Party({
            name

        })
        if (req.file) {
            party.image = req.file.path
        } else {
            res.status(400)
            throw new Error(201).send('image is required')
        }

        await party.save()
        res.status(201).send(party)
    } catch (error) {
        res.status(500)
        return res.send({ error: (error.message) ? error.message : "Internal server error" });

    }
})





module.exports = { login, createUser, getAllUser, getUserProfile, deleteUser, getOwnProfile, createParty}