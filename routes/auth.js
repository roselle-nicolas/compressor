const express = require('express');
//controllers
const userCtrl = require('../controllers/auth');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/register', userCtrl.singup);
router.post('/login', userCtrl.login);
router.get('/get-user/:userId', auth, userCtrl.getUser)

module.exports = router;