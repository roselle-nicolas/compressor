  
const express = require("express");
const router = express.Router();
const repoCtrl = require("../controllers/repository");
const auth = require("../middlewares/auth");

router.get("/getall/",auth, repoCtrl.getAll);
router.get("/getone/",auth, repoCtrl.getOne);
router.post("/post/",auth, repoCtrl.create);
router.put("/modify/:id",auth, repoCtrl.modify);
router.delete("/delete/:id",auth, repoCtrl.delete);


module.exports = router;
