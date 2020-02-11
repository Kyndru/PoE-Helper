const express = require('express');
const checkAuth = require('../middleware/check-auth');
const settingsController = require('../controllers/user-settings');

const router = express.Router();

router.get('', checkAuth, settingsController.getSettings);
router.post('', checkAuth, settingsController.saveSettings);

module.exports = router;
