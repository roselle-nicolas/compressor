const express = require('express')
const router = express.Router()
const formatCtrl = require('../controllers/format')

router.post('/jpg/', formatCtrl.jpgComp)
router.post('/png/', formatCtrl.pngComp)
router.post('/gif/', formatCtrl.gifComp)
router.post('/svg', formatCtrl.svgComp)

module.exports = router
