const Bathroom = require('../models/bathroomModel');
const Review = require('../models/reviewModel');
const Flag = require('../models/flagModel');
const Building = require('../models/buildingModel');

// Middleware to check if user is admin (example)
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        return next();  // Allow the request to proceed
    }
    return res.status(403).json({ message: 'Access denied. Admins only.' });
};

// Get all flagged reviews (for admins)
exports.getFlaggedReviews = async (req, res) => {
    try {
        // Fetch flagged reviews for admin review
        const flaggedReviews = await Flag.findAll({
            include: [
                {
                    model: Review,
                    attributes: ['id', 'content', 'rating'],  // Include review details
                },
                {
                    model: User,  // Assuming user is the one who flagged the review
                    attributes: ['username', 'email'],
                },
            ],
        });

        if (!flaggedReviews.length) {
            return res.status(404).json({ message: 'No flagged reviews found' });
        }

        res.status(200).json({ flaggedReviews });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching flagged reviews' });
    }
};

// Delete a flagged review (for admins)
exports.deleteFlaggedReview = async (req, res) => {
    const { reviewId } = req.params;

    try {
        const review = await Review.findByPk(reviewId);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        await review.destroy();  // Delete the flagged review
        res.status(200).json({ message: 'Flagged review deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting flagged review' });
    }
};

// Update a bathroom's details (for admins)
exports.updateBathroom = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
        const bathroom = await Bathroom.findByPk(id);

        if (!bathroom) {
            return res.status(404).json({ message: 'Bathroom not found' });
        }

        // Update the bathroom with new details
        await bathroom.update({
            name,
            latitude,
            longitude,
            description,
        });

        res.status(200).json({
            message: 'Bathroom details updated successfully',
            bathroom,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating bathroom' });
    }
};

// Delete a bathroom (for admins)
exports.deleteBathroom = async (req, res) => {
    const { id } = req.params;

    try {
        const bathroom = await Bathroom.findByPk(id);

        if (!bathroom) {
            return res.status(404).json({ message: 'Bathroom not found' });
        }

        await bathroom.destroy();  // Delete the bathroom
        res.status(200).json({ message: 'Bathroom deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting bathroom' });
    }
};

// Add a new bathroom (for admins) TODO maybe?
exports.addBathroom = async (req, res) => {
    // get building id from req
    const { id } = req.params;
    const { name, description } = req.body;

    try {
        // Create a new bathroom in the database
        const newBathroom = await Bathroom.create({
            name,
            description,
            buildingId: id,
        });

        res.status(201).json({
            message: 'Bathroom added successfully',
            bathroom: newBathroom,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error adding bathroom' });
    }
}

// add a new building (for admins)
exports.addBuilding = async (req, res) => {
    const { name, latitude, longitude, description } = req.body;

    try {
        // Create a new building in the database
        const newBuilding = await Building.create({
            name,
            latitude,
            longitude,
            description,
        });

        res.status(201).json({
            message: 'Building added successfully',
            building: newBuilding,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error adding building' });
    }
}
