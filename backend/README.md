### Building Routes (/api/buildings)
 - GET / - Get all buildings.
 - GET /:id - Get details of a specific building.
 - GET /:id/bathrooms - Get all bathrooms in a building.
 - GET /:id/bathrooms/:bathroomId - Get details of a specific bathroom.
 - GET /:id/bathrooms/:bathroomId/reviews - Get reviews for a specific bathroom.
 - POST /:id/bathrooms/:bathroomId/reviews - Add a new review for a bathroom.
 - PUT /:id/bathrooms/:bathroomId/reviews/:reviewId - Update an existing review.
 - DELETE /:id/bathrooms/:bathroomId/reviews/:reviewId - Delete a specific review.
 - PUT /:id/bathrooms/:bathroomId/reviews/:reviewId/flag - Flag a review for moderation.

### Auth Routes (/api/auth)
 - POST /login - User login.
 - POST /register - User registration.
 - GET /user - Get details of the logged-in user.

### Admin Routes (/api/admin)
 - GET /reviews/flagged - Get all flagged reviews.
 - DELETE /reviews/:id - Delete a flagged review.
 - DELETE /bathrooms/:id - Delete a bathroom.
 - PUT /bathrooms/:id - Update bathroom details.
 - POST /buildings - Add a new building.
 - POST /buildings/:id/bathrooms - Add a new bathroom to a building.