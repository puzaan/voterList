const express = require('express')
const voterController = require('../controller/voterController');
const { protect, admin, adminProtect } = require('../middleware/auth');
const router = express.Router()
router.route('/:boothId').post(adminProtect, admin, voterController.createVoterList)
router.route('/') .get(adminProtect, admin, voterController.getAllVoters)
router.route('/:id').get(voterController.getVoterDetail).put(protect, voterController.updateVoter)
module.exports = router