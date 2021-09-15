const express = require("express");
const voterController = require("../controller/voterController");
const { protect, admin, adminProtect } = require("../middleware/auth");

const router = express.Router({ mergeParams: true });
router
    .route("/")
    .post(adminProtect, admin, voterController.setAdminAndBoothId , voterController.createVoterList)
    .get(adminProtect, admin, voterController.getAllVoters);
router
    .route("/:id")
    .patch(voterController.updateVoterDetails)
    .delete(voterController.deleteVoter)
    .get(voterController.getVoterDetail)
    
    

router.route("/:id/update").patch(protect, voterController.updateVoter);
module.exports = router;
