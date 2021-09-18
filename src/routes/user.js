const express = require('express');
const router = express.Router();
const {verifyAccess} = require('../middlewares/auth');
const usersController = require('../controllers/userControllers');

router.patch('/edit-profile', verifyAccess, usersController.editProfile);
router.get('/homepage', usersController.homePage);
router.get('/detail/:userId', usersController.detailUser);

module.exports = router;