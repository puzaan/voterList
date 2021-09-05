const express = require('express')
const router = express.Router()
const { protect, admin, adminProtect } = require('../middleware/auth')
const { login, createUser, getAllUser, getUserProfile, getOwnProfile } = require("../controller/userController")
const assigned = require('../controller/assignPlaceController')
const assignPlaceRouter = require('./assignPlaceRoutes')



router.use('/:userId/assigned', assignPlaceRouter)

router.post('/login', login)
router.post('/register', createUser)
router.get('/alluser', adminProtect, admin, getAllUser)
// router.get('/profile', protect, getUserProfile)
router.get('/:id', adminProtect, admin, getUserProfile)
router.get('/user/profile', protect ,getOwnProfile)



// router.route('/:userId/assigned').post(adminProtect, admin, assigned.createAssignPlace)

module.exports = router