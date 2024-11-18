const User = require('./userModel');  // Import User model for the association
const Bathroom = require('./bathroomModel');  // Import Bathroom model for the association
const Review = require('./reviewModel');  // Import Review model to associate flags with reviews
const Flag = require('./flagModel');  // Import Flag model to associate reviews with flags
const Building = require('./buildingModel');  // Import Building model for the association

Review.belongsTo(User, { foreignKey: 'userID', onDelete: 'CASCADE' });  // One Review belongs to one User
Review.belongsTo(Bathroom, { foreignKey: 'bathroomId', onDelete: 'CASCADE' });  // One Review belongs to one Bathroom
Review.hasMany(Flag, { foreignKey: 'reviewId', onDelete: 'CASCADE' });
Flag.belongsTo(Review, { foreignKey: 'reviewId', onDelete: 'CASCADE' });
Flag.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
Bathroom.hasMany(Review, { foreignKey: 'bathroomId', onDelete: 'CASCADE' });
Bathroom.hasOne(Building, { foreignKey: 'buildingId', onDelete: 'CASCADE' });
Building.hasMany(Bathroom, { foreignKey: 'buildingId', onDelete: 'CASCADE' });
User.hasMany(Review, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Flag, { foreignKey: 'userId', onDelete: 'CASCADE' });

module.exports = {
    User,
    Bathroom,
    Review,
    Flag,
    Building,
};