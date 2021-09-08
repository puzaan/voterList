const express = require('express')
const router = express.Router();
const { addParty, partyList, partyDelete, partyDetail, test} = require('../controller/partyController')
const { upload} = require('../middleware/filehelper')
// const Party = require('../model/partyModel');
// const multer = require('multer')
const {protect, adminProtect, admin} = require('../middleware/auth')


router.post('/partycreate/:voterId', upload.single('photo'), adminProtect, addParty)
router.get('/list', partyList)
router.delete('/:id', partyDelete)
router.get('/:id', partyDetail )
router.get('/', test)


module.exports = {
    routers: router
}