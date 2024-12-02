const Bathroom = require('../models/bathroomModel');
const Review = require('../models/reviewModel');
const Building = require('../models/buildingModel');
const Flag = require('../models/flagModel');

// get all buildings. Include the list of bathrooms, and the average rating of each bathroom, and the average of the building
exports.getBuildings = async (req, res) => {
    try {
        // Fetch all buildings with associated bathrooms and reviews
        const buildings = await Building.findAll({
            include: [
                {
                    model: Bathroom,
                    attributes: ['id', 'name', 'description'], // Include bathrooms for each building
                    include: [
                        {
                            model: Review,
                            attributes: ['id','content', 'rating', 'createdAt'], // Include reviews for each bathroom
                        },
                    ],
                },
            ],
        });
        for (const building of buildings) {
            let totalRating = 0;
            let totalReviews = 0;
            for (const bathroom of building.Bathrooms) {
                let batTotal = 0
                let batReviews = 0
                for (const review of bathroom.Reviews) {
                    batTotal += review.rating;
                    batReviews++;
                }
                if (batReviews > 0) {
                    bathroom.averageRating = batTotal / batReviews;
                    totalRating += batTotal;
                    totalReviews += batReviews;
                }
            }
            if (totalReviews > 0)
                building.averageRating = totalRating / totalReviews;
        }
        res.status(200).json({ buildings });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching buildings' });
    }
};

// Get a specific building by its ID
exports.getBuilding = async (req, res) => {
    const { id } = req.params;

    try {
        // Fetch
        const building = await Building.findByPk(id, {
            include: [
                {
                    model: Bathroom,
                    attributes: ['id', 'name', 'description'], // Include bathrooms for the building
                    include: [
                        {
                            model: Review,
                            attributes: ['rating'], // Include reviews for each bathroom
                        },
                    ],
                },
            ],
        });
        if (!building) {
            return res.status(404).json({ message: 'Building not found' });
        }
        let totalRating = 0;
        let totalReviews = 0;
        for (const bathroom of building.Bathrooms) {
            let batTotal = 0
            let batReviews = 0
            for (const review of bathroom.Reviews) {
                batTotal += review.rating;
                batReviews++;
            }
            if (batReviews > 0) {
                bathroom.averageRating = batTotal / batReviews;
                totalRating += batTotal;
                totalReviews += batReviews;
            }
        }
        if (totalReviews > 0) {
            building.averageRating = totalRating / totalReviews;
            console.log(building);
        }
        res.status(200).json({ "building":building });
        
    } catch (err) {
        console.error(err);
    }
}


// Get all bathrooms for a specific building
exports.getBathrooms = async (req, res) => {
    const { id } = req.params;

    try {
        // Fetch all bathrooms with associated reviews
        const bathrooms = await Bathroom.findAll({
            where: { buildingId: id },
            include: [
                {
                    model: Review,
                    attributes: ['id', 'rating', 'content'], // Include reviews for each bathroom
                },
            ],
        });
        
        // get average ratings
        for (const bathroom of bathrooms) {
            let totalRating = 0;
            let totalReviews = 0;
            for (const review of bathroom.Reviews) {
                totalRating += review.rating;
                totalReviews++;
            }
            if (totalReviews > 0)
                bathroom.averageRating = totalRating / totalReviews;
        }


        res.status(200).json({ bathrooms });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching bathrooms' });
    }
};

// Get a specific bathroom by its ID
exports.getBathroom = async (req, res) => {
    const { bathroomId } = req.params;

    try {
        // Fetch the bathroom with its reviews based on the given ID
        const bathroom = await Bathroom.findByPk(bathroomId, {
            include: [
                {
                    model: Review,
                    attributes: ['id', 'rating', 'content', 'createdAt'], // Include reviews for the bathroom
                },
            ],
        });
        if (!bathroom) {
            return res.status(404).json({ message: 'Bathroom not found' });
        }
        // get average ratings
        let totalRating = 0;
        let totalReviews = 0;
        for (const review of bathroom.Reviews) {
            totalRating += review.rating;
            totalReviews++;
        }
        if (totalReviews > 0)
            bathroom.averageRating = totalRating / totalReviews;


        res.status(200).json({ bathroom });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching bathroom' });
    }
};

// Get all reviews for a specific bathroom
exports.getReviews = async (req, res) => {
    const { bathroomId } = req.params;

    try {
        // Fetch all reviews for a specific bathroom
        const reviews = await Review.findAll({
            where: { bathroomId },
            attributes: ['id', 'rating', 'content', 'createdAt'],
            include: [
                {
                    model: Flag,
                    attributes: ['id'],
                },
            ],
        });

        if (!reviews.length) {
            return res.status(404).json({ message: 'No reviews found for this bathroom' });
        }

        res.status(200).json({ reviews });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching reviews' });
    }
};

// Add a new review for a bathroom
exports.addReview = async (req, res) => {
    const { bathroomId } = req.params;
    const { rating, content } = req.body;

    try {
        // Ensure the bathroom exists
        const bathroom = await Bathroom.findByPk(bathroomId);

        if (!bathroom) {
            return res.status(404).json({ message: 'Bathroom not found' });
        }

        // Create a new review for the bathroom
        const newReview = await Review.create({
            bathroomId,
            rating,
            content,
            userId: req.userId, // Assuming `userId` is attached to the request via auth middleware
        });

        res.status(201).json({
            message: 'Review added successfully',
            review: newReview,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error adding review' });
    }
};

// Update an existing review
exports.updateReview = async (req, res) => {
    const { reviewId } = req.params;
    const { rating, content } = req.body;

    try {
        const review = await Review.findByPk(reviewId);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Update the review with the new content or rating
        await review.update({
            rating,
            content,
        });

        res.status(200).json({
            message: 'Review updated successfully',
            review,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating review' });
    }
};

// Delete a review
exports.deleteReview = async (req, res) => {
    const { reviewId } = req.params;

    try {
        const review = await Review.findByPk(reviewId);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        await review.destroy();  // Delete the review

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting review' });
    }
};

// Flag a review for admin review
exports.flagReview = async (req, res) => {
    const { reviewId } = req.params;

    try {
        const review = await Review.findByPk(reviewId);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Flag the review
        const newFlag = await Flag.create({
            reviewId,
            userId: req.userId, // Assuming `userId` is attached to the request via auth middleware
        });

        res.status(200).json({ message: 'Review flagged successfully', flag: newFlag });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error flagging review' });
    }
};
