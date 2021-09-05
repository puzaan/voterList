const express = require('express')
const router = express.Router()
const { protect, admin, adminProtect } = require('../middleware/auth')
const { login, createUser, getAllAdminUser, getProfile } = require("../controller/adminController")


router.post('/login', login)
router.post('/register', adminProtect, admin,createUser)
router.get('/getAllAdminUser', adminProtect, admin, getAllAdminUser)
router.get('/profile', adminProtect, getProfile)

module.exports = router