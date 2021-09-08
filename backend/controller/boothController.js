const bodyParser = require('body-parser')
const catchAsync = require('express-async-handler')
const Booths = require('../model/boothModel')

exports.createBooth = catchAsync(async (req, res, next) => {
    const newBooths = await Booths.create(req.body)
    res.status(201).json({
        status: 'Success',
        data: {
            newBooths
        }
    })
})

exports.allBooth = catchAsync(async (req, res, next) => {
    const booths = await Booths.find().populate('voter')
    res.status(200).json({
        status: 'success',
        results: booths.length,
        data: {
            booths
        }
    })
})

exports.getOneBooth = catchAsync(async (req, res, next) => {
    const booth = await Booths.findById(req.params.id).populate('voter')
    if (booth) {
        res.json(booth);
    } else {
        res.status(404);
        throw new Error('Booth belong to this token is no longer exist')
    }
})