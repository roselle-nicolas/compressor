const express = require("express");
const router = express.Router();
const multer = require("../middlewares/multer-config");
// const formatCtrl = require("../controllers/format")
const formatSocketCtrl = require("../controllers/formatSocket");
 

router.post("/jpg/", multer, formatSocketCtrl.jpgComp);
router.post("/png/",multer, formatSocketCtrl.pngComp);
router.post("/gif/",multer, formatSocketCtrl.gifComp);
router.post("/svg",multer, formatSocketCtrl.svgComp);

module.exports = router;