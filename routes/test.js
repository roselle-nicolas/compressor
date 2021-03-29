const express = require('express')
const router = express.Router()
const multer = require('../middlewares/multer-config')
const testCtrl = require('../controllers/test')

router.post('/choosecomp/', multer, testCtrl.chooseComp)
router.post('/ping/', multer, testCtrl.pong)
router.post('/sendfile/', multer, testCtrl.sendFile)
router.get('/local/', testCtrl.local)

module.exports = router