const express = require('express');
const router = express.Router();
const {register,login,pong} = require('../controllers/authController')

//testing route
router.get('/ping',pong)
router.post('/register',register);
router.post('/login',login);

module.exports = router;