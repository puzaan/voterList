const catchAsync = require('express-async-handler')
const Admin = require('../model/adminMoel');
const { generateAdminToken} = require('../utils/generateToken');


const createUser = catchAsync(async (req, res, next) => {
    const { name, sex, dob, password, phone, address, email } = req.body

    const adminExist = await Admin.findOne({ email })
    if (adminExist) {
        res.status(400);
        throw new Error("User already exists");
    }

    const admin = await Admin.create({
        name,
        sex,
        dob,
        password,
        phone,
        address,
        email
    })

    if (admin) {
        res.status(201);
        res.json({
            _id: admin.id,
            name: admin.name,
            dob: admin.dob,
            phone: admin.phone,
            address: admin.address,
            email: admin.email,
            isAdmin: admin.isAdmin,
            token: generateAdminToken(admin.id),
        })
    } else {
        res.status(400)
        throw new Error('Invalied user data')
    }
})


const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email })
    if (admin && (await admin.matchPassword(password))) {
        return res.json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            isAdmin: admin.isAdmin,
            token: generateAdminToken(admin._id)
        })
    } else {
        res.status(401);
        throw new Error('Not authorized user')
    }
})

const admins = catchAsync(async (req, res) => {
    // parse data from req body
    const { email, password } = req.body;

    // find user if it exist in database 

    const admin = await Admin.findOne({ email })

    if (admin && (await admin.matchPassword(password) && admin.isAdmin === true)) {
        return res.json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            isAdmin: admin.isAdmin,
            token: generateToken(admin._id)

        })
    } else {
        res.status(401);
        throw new Error('Not authorized user as admin or invalid Email or Password')
    }

})

const getAllAdminUser = catchAsync(async (req, res, next) => {
    const admin = await Admin.find()
    res.json({
        status: 'success',
        results: admin.length,
        data: {
            admin
        }
    })
})


const getProfile = catchAsync(async (req, res) => {
    const admin = await Admin.findById(req.admin._id)
    if (admin) {
        res.json(admin);
    } else {
        res.status(404);
        throw new Error('User belong to tis token is no longer exist')
    }
})




module.exports = { login, createUser, admins, getProfile, getAllAdminUser }