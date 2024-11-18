/*
Authentication & User Management
POST /api/login
Authenticate users and provide a session or JWT token.
POST /api/register
Register a new user (students and admins).
POST /api/logout
Log the user out and destroy their session.
GET /api/users/

Fetch user details (e.g., roles, username).
*/

const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const {
    login,
    register,
    getUser,
    } = require('../controllers/authController');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/user', authMiddleware, getUser);

module.exports = router;
