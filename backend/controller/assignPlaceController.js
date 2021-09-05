const AssignedPlace = require('../model/assigned')
const catchAsync = require('express-async-handler')
const handler = require('./handlerController')

exports.gettAllAssignPlace = catchAsync(async (req, res, next) => {
    let filter = {}
    if(req.params.userId) filter = {user: req.params.userId}
    const place = await AssignedPlace.find(filter);

    res.status(200).json({
        status: 'success',
        results: place.length,
        data: {
            place
        }
    })
})

exports.createAssignPlace = catchAsync(async (req, res, next) => {
    //Allow nested routes
    if (!req.body.user) req.body.user = req.params.userId;
    if (!req.body.Adminuser) req.body.Adminuser = req.admin._id // it will come from protect middleware
    const newPlace = await AssignedPlace.create(req.body);

    res.status(201).json({
        status: 'success',
        
        data: {
            newPlace
        }
    })
})



exports.Delete = handler.deleteOne(AssignedPlace)