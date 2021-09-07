const express = require('express')
const router = express.Router()
const { protect, admin, adminProtect } = require('../middleware/auth')
const { login, createUser, getAllUser, getUserProfile, getOwnProfile, createParty } = require("../controller/userController")
const assigned = require('../controller/assignPlaceController')
const assignPlaceRouter = require('./assignPlaceRoutes')



router.use('/:userId/assigned', assignPlaceRouter)
router.post('/login', login)
router.post('/register', createUser)
router.get('/alluser', adminProtect, admin, getAllUser)
router.get('/:id', adminProtect, admin, getUserProfile)
router.get('/user/profile', protect, getOwnProfile)

module.exports = router