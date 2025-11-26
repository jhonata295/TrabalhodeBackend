const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, updateMe, deleteMe } = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authMiddleware, getMe);
router.put('/me', authMiddleware, updateMe);
router.delete('/me', authMiddleware, deleteMe);

module.exports = router;
