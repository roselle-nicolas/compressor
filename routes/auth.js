const express = require('express');
//controllers
const userCtrl = require('../controllers/auth');

const router = express.Router();

router.post('/register', userCtrl.singup);
router.post('/login', userCtrl.login);

module.exports = router;