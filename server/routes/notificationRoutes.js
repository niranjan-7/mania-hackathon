const express = require('express');
const { getNotificationsForUser } = require('../controllers/notificationController');

const router = express.Router();

// Route to get notifications for a specific user
router.get('/:userEmail', getNotificationsForUser);

module.exports = router;
