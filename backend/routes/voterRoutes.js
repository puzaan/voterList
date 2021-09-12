const express = require('express')
const voterController = require('../controller/voterController');
const { protect, admin, adminProtect } = require('../middleware/auth');
const Voters = require('../model/voterModel')
const {upload} = require('../middleware/filehelper')
const router = express.Router()
router.route('/:boothId').post(adminProtect, admin, voterController.createVoterList)
router.route('/') .get(adminProtect, admin, voterController.getAllVoters)
router.route('/:id').get(voterController.getVoterDetail).put(protect, voterController.updateVoter)
// router.route('/:id/party').post(upload.single('photo'), voterController.addParty)

// router.get('/all', function (req, res, next) {
//     // Implementing $lookup for customers collection
//     // Voters.aggregate([
//     //     {
//     //         $lookup: {
//     //             from: "partys",
//     //             localField: '_id',
//     //             foreignField: 'voter',
//     //             as: 'voter_party'
//     //         },
//     //     },
//     //     // Deconstructs the array field from the
//     //     // input document to output a document
//     //     // for each element
//     //     {
//     //         $unwind: "$orders_info",
//     //     },
//     // ])
//     Voters.aggregate(pipeline[
//         {
//         $lookup: {
//                 from: "partys",
//                 as: "partyss",
//                 let: {voter: "$_id" },
//                 pipeline: [
//                     { $match: { $expr: { $eq: ['$voter', '$$voter']}}}
//                 ]
//             }
//         },
//     {
//         $project: {
//             voter: 1,
//             name: 1,
//             willVote: 1,
//             maybe: 1,
//             photo: 1,
//             updatedBy: 1,
//             createdAt:1
//             }
//         }
//     ])
//         .then((result) => {
//             console.log(result);
//         })
//         .catch((error) => {
//             console.log(error);
//         });
    
// })
module.exports = router


