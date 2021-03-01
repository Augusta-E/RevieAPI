module.exports = (sequelize, DataTypes) => {
 
  const Rating = sequelize.define("Ratings", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    review_id: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    rating: {
      allowNull: false,
      type: DataTypes.UUID,
    }
  })
  Rating.associate = models => {
    Rating.hasMany(models.Reviews, {
      as: 'reviews',
      foreignKey: 'review_id',
    });
  }
  return Rating;
};