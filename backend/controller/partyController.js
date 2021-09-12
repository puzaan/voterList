const catchAsync = require('express-async-handler');
const Party = require('../model/partyModel');
const { unlink } = require('fs');

const addParty = catchAsync(async (req, res, next) => {
    try {
        const createParty = new Party({
            name: req.body.name,
            voter: req.params.voterId,
            createdBy : req.admin._id
        });
        if (req.file) {
            createParty.photo = req.file.path
        } else {
            res.status(400)
            throw new Error('photo file required')
        }
        await createParty.save()
        res.status(201).send(createParty)
    } catch (error) {
        res.status(500);
        return res.send({ error: (error.message) ? error.message : "Internal server error" });

    }
});



const partyList = catchAsync(async (req, res, next) => {
    try {
        const party = await Party.find()

        res.status(200).send(party)
    } catch (error) {
        res.status(400).send(error.message)
        throw new Error('Something went Wrong')
    }
});


const partyDelete = catchAsync(async (req, res, next) => {

    const partyid = await Party.findById(req.params.id);


    if (partyid) {
        const datas = partyid.photo;
        // console.log(datas)
        unlink(datas, (err) => {
            if (err) throw err;
            console.log(`${datas} is deleted`);
        });

        await partyid.remove()
        res.json({
            message: 'File Deleted'
        })
    } else {
        res.status(404);
        throw new Error("id not found")
    }
})

const partyDetail = catchAsync(async (req, res, next) => {

    const party = await Party.findById(req.params.id);

    if (party) {
        res.send(party)
    } else {
        res.status(404);
        throw new Error("id not found")
    }
})

const updateParty = catchAsync(async (req, res, next) => {
    const party = await Party.findById(req.params.id);
    if (party) {
        party.willVote = req.body.willVote || party.willVote;
        party.maybe = req.body.maybe || party.maybe;
        party.updatedBy = req.user.id

        updatedparty = await party.save();
        res.json(updatedparty)
    } else {
        res.status(404)
        throw new Error('party details not found')
}
})

module.exports = { addParty, partyList, partyDelete, partyDetail, updateParty }