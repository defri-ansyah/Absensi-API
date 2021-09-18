const express = require('express');
const router = express.Router();
const {verifyAccess} = require('../middlewares/auth');
const attendanceController = require('../controllers/attendanceControllers');

router.get('/detail', verifyAccess, attendanceController.getAttendance);
router.post('/', verifyAccess, attendanceController.createAttendance);

module.exports = router;