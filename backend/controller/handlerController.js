
const catcAsync = require("express-async-handler");

exports.deleteOne = Model => catcAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
        return next(new Error('No document found with that ID', 404))
    }
    res.status(204).json({
        status: 'success',
        data: null,
        message: 'File deleted'
    })
})



exports.updateOne = Model => catcAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    if (!doc) {
        return next(new Error('No document found with this Id', 404));
    }
    res.send(202).json({
        status: 'success',
        data: {
            data: doc
        },
        message: 'Fill updated'
    })
})