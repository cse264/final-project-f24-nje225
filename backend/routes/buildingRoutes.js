/*
Bathroom Locations
GET /api/bathrooms
Fetch all bathroom locations with ratings and coordinates.
GET /api/bathrooms/

Fetch details (ratings, reviews, features) for a specific bathroom.
POST /api/bathrooms (Admin Only)
Add a new bathroom to the database.
PUT /api/bathrooms/
(Admin Only)
Update details for a specific bathroom (e.g., location, description).
DELETE /api/bathrooms/
(Admin Only)
Remove a bathroom from the database.
*/

const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const {
    getBuildings,
    getBuilding,
    getBathrooms,
    getBathroom,
    getReviews,
    addReview,
    updateReview,
    deleteReview,
    flagReview,
    } = require('../controllers/buildingController');

const router = express.Router();

router.get('/', authMiddleware, getBuildings);
router.get('/:id', authMiddleware, getBuilding);
router.get('/:id/bathrooms', authMiddleware, getBathrooms);
router.get('/:id/bathrooms/:bathroomId', authMiddleware, getBathroom);
router.get('/:id/bathrooms/:bathroomId/reviews', authMiddleware, getReviews);
router.post('/:id/bathrooms/:bathroomId/reviews', authMiddleware, addReview);
router.put('/:id/bathrooms/:bathroomId/reviews/:reviewId', authMiddleware, updateReview);
router.delete('/:id/bathrooms/:bathroomId/reviews/:reviewId', authMiddleware, deleteReview);
router.put('/:id/bathrooms/:bathroomId/reviews/:reviewId/flag', authMiddleware, flagReview);

module.exports = router;