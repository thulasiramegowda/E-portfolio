const express = require('express');
const router = express.Router();
const { authAdmin, setupAdmin, logoutAdmin, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', authAdmin);
// Setup is now handled securely via CLI: npm run init-admin
// router.post('/setup', setupAdmin);
router.post('/logout', logoutAdmin);
router.get('/me', protect, getMe);

module.exports = router;

