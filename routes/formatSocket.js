const express = require("express");
const router = express.Router();
const multer = require("../middlewares/multer-config");
// const formatCtrl = require("../controllers/format")
const formatSocketCtrl = require("../controllers/formatSocket");
const auth = require("../middlewares/auth");
 

router.post("/jpg/",auth, multer, formatSocketCtrl.jpgComp);
router.post("/png/", auth, multer, formatSocketCtrl.pngComp);
router.post("/gif/",auth, multer, formatSocketCtrl.gifComp);
router.post("/svg",auth, multer, formatSocketCtrl.svgComp);

module.exports = router;