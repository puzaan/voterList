const express = require("express");
const router = express.Router();
const booth = require("../controller/boothController");
const { admin, adminProtect, protect } = require("../middleware/auth");
const vooterRouter = require('../routes/voterRoutes')


router.use('/:boothId/vooter', vooterRouter)
router
    .route("/")
    .post(adminProtect, admin, booth.createBooth)
    .get(adminProtect, admin, booth.allBooth);
router.route("/:id").get(adminProtect, booth.getOneBooth);

module.exports = router;
