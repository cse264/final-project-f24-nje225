// Validates JWT tokens and ensures users are authenticated. 

const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
    // Get the token from the Authorization header (e.g., 'Bearer <token>')
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify the token using JWT_SECRET
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the user ID and role from the decoded token to the request object
        req.userId = decoded.userId;
        req.role = decoded.role;
        // can deny access - const authMiddleware = (requiredRole) => (req, res, next) => {

        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;