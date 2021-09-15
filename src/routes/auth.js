const express = require('express');
const router = express.Router();
const {verifyAccess} = require('../middlewares/auth');
const authController = require('../controllers/authControllers');

router.post('/login', authController.login);

module.exports = router;