const express = require('express');
const router = express.Router();
const {verifyAccess} = require('../middlewares/auth');
const usersController = require('../controllers/userControllers');

router.patch('/edit-profile', verifyAccess, usersController.editProfile);
router.get('/detail', usersController.getDetailAll);

module.exports = router;