const catchAsync = require('express-async-handler')
const User = require('../model/userModel')
const Voters = require('../model/voterModel')

exports.createVoterList = catchAsync(async (req, res, next) => {
    if (!req.body.createdBy) req.body.createdBy = req.admin._id
    if (!req.body.booth) req.body.booth = req.params.boothId
    const newVoter = await Voters.create(req.body);
    res.status(201).json({
        status: 'success',

        data: {
            newVoter
        }
    })
})

exports.getAllVoters = catchAsync(async (req, res, next) => {
    let filter = {}
    if (req.params.voterId) filter = { voter: req.params.voterId}
    const voterList = await Voters.find(filter)
        //.populate('party');
    res.status(200).json({
        status: 'success',
        results: voterList.length,
        data: {
            voterList
        }
    })
})

// exports.joinVoterAndParty = catchAsync(async (req, res, next) => {
//     Voters.aggregate(pipeline[
//         {
//         $lookup: {
//                 from:''
//             }
//         }
//     ])
// })


exports.getVoterDetail = catchAsync(async (req, res, next) => {
    const voter = await Voters.findById(req.params.id)
        //.populate('party');
    if (voter) {
        res.json(voter)
    } else {
        res.status(404);
        throw new Error('voter details not found')
    }
})
exports.updateVoter = catchAsync(async (req, res, next) => {
    const voter = await Voters.findById(req.params.id)
    // if (!req.body.createdBy) req.body.createdBy = req.admin._id
    
    if (voter) {
        // if (!req.body.updatedBy) req.body.updatedBy = req.user._id
        // const newVoter = await voter.save(req.body);
        voter.name = req.body.name || voter.name;
        voter.updatedBy = req.user.id;
        voter.voterId = req.body.voterId || voter.voterId;
        voter.age = req.body.age || voter.age;
        voter.sex = req.body.sex || voter.sex;
        voter.relation = req.body.relation || voter.relation;
        voter.contact = req.body.contact || voter.contact;
        voter.probility = req.body.probility 
        if (!req.body.voterTo && req.body.probility == 'yes') {
            voter.voteTo = "AMLA"
        } else {
            voter.voteTo = req.body.voteTo
        }
        


        updateVoters = await voter.save();
        res.json(updateVoters)
    } else {
        res.status(404);
        throw new Error('voter details not found')
    }
    
})


// exports.createParty = catchAsync(async (req, res, next) => {
//     const voter = await Voters.findById(req.params.id)
    
// })

exports.addParty = catchAsync(async (req, res, next) => {
    try {
        const voter = await Voters.findById(req.params.id)

        const createParty = {
            name: req.body.name,
            //createdBy: req.admin._id
        };
        if (req.file) {
            createParty.photo = req.file.path
        } else {
            res.status(400)
            throw new Error('photo file required')
        }
        voter.voteTo.push(createParty)
        await voter.save()
        res.status(201).send(voter)
    } catch (error) {
        res.status(500);
        return res.send({ error: (error.message) ? error.message : "Internal server error" });

    }
});


