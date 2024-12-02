/*
DELETE /api/bathrooms/
(Admin Only)
Remove a bathroom from the database.
DELETE /api/reviews/
(Admin Only)
Delete a specific review (e.g., inappropriate content).
GET /api/reviews/flagged (Admin Only)
Fetch all flagged reviews for moderation.
*/

const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const {
    getFlaggedReviews,
    deleteFlaggedReview,
    addBuilding,
    addBathroom,
    deleteBathroom,
    updateBathroom,
    updateBuilding
    } = require('../controllers/adminController');

const router = express.Router();

router.get('/reviews/flagged', authMiddleware, getFlaggedReviews);
router.delete('/reviews/:id', authMiddleware, deleteFlaggedReview);
router.delete('/bathrooms/:id', authMiddleware, deleteBathroom);
router.put('/bathrooms/:id', authMiddleware, updateBathroom);
router.post('/buildings', authMiddleware, addBuilding);
router.put('/buildings/:id', authMiddleware, updateBuilding);
router.post('/buildings/:id/bathrooms', authMiddleware, addBathroom);

module.exports = router;
