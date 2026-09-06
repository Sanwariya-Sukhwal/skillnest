// const express = require('express');
// const { register, login, getMe } = require('../controllers/authController');
// const { protect } = require('../middleware/auth');

// const router = express.Router();

// router.post('/register', register);
// router.post('/login', login);
// router.get('/me', protect, getMe);

// module.exports = router;
const express = require('express');

const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

console.log('AUTH CONTROLLER:', Object.keys(authController));
console.log('AUTH MIDDLEWARE:', Object.keys(authMiddleware));

const router = express.Router();

router.post('/register', authController.register);

router.post('/login', authController.login);

router.get('/me', authMiddleware.protect, authController.getMe);

module.exports = router;