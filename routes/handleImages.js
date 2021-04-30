const express = require("express");
const router = express.Router();
const handleImagesCtrl = require("../controllers/handleImages");

router.delete("/:filename", handleImagesCtrl.deletePicture);

module.exports = router;