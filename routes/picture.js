const express = require("express");
const router = express.Router();
const pictureCtrl = require("../controllers/picture");
const auth = require("../middlewares/auth");

router.post("/", auth, pictureCtrl.createPicture);
router.post("/selected/",auth, pictureCtrl.getPicturesSelected);
router.put("/:_id", auth, pictureCtrl.modify);
router.delete("/:_id",auth, pictureCtrl.deletePicture);

module.exports = router;