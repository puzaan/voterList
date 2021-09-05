const express = require('express')
const assignPlaceController = require('../controller/assignPlaceController')
const { protect, admin, adminProtect } = require('../middleware/auth')
const router = express.Router({mergeParams: true});


router
    .route('/')
    .get(
        adminProtect,
        admin,
        assignPlaceController.gettAllAssignPlace
    )// get all assigned place
    .post(
        adminProtect,
        admin,
        assignPlaceController.createAssignPlace
    )

//router.route('/:id', adminProtect, admin)

//router.get('/all', assignPlaceController.gettAllAssignPlace)

module.exports = router