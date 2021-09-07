const express = require('express')
const assignPlaceController = require('../controller/assignPlaceController')
const { protect, admin, adminProtect } = require('../middleware/auth')
const router = express.Router({mergeParams: true});


router
    .route('/')
    // get all assigned place
    .get(
        adminProtect,
        admin,
        assignPlaceController.gettAllAssignPlace
    )
    // post the assigned place
    .post(
        adminProtect,
        admin,
        assignPlaceController.createAssignPlace
    )

module.exports = router