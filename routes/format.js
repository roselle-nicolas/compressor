const express = require("express");
const router = express.Router();
const multer = require("../middlewares/multer-config");
// const formatCtrl = require("../controllers/format")
const formatCtrl = require("../controllers/formatasync");
 

router.post("/jpg/", multer, formatCtrl.jpgComp);
router.post("/png/",multer, formatCtrl.pngComp);
router.post("/gif/",multer, formatCtrl.gifComp);
router.post("/svg",multer, formatCtrl.svgComp);

module.exports = router;
