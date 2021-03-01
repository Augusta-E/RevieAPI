module.exports = (sequelize, DataTypes) => {
   
  
  const Review = sequelize.define("Reviews", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
      allowNull: false,
      type: DataTypes.UUID,
    },   
    landlordReview: {
      allowNull: false,
      type: DataTypes.TEXT,
    },   
    environmentReview: {
      allowNull: false,
      type: DataTypes.TEXT,
    },    
    ammenitiesQuality: {
      allowNull: false,
      type: DataTypes.TEXT,
    },    
    image:{ 
      allowNull: true,
      type: DataTypes.STRING,
    },    
    video: {
      allowNull: true,
      type: DataTypes.STRING,
    }
    })
    Review.associate = models => {
      Review.hasMany(models.Ratings, {
        as: 'ratings',
        foreignKey: 'review_id'     
       });
  }
  return Review
};
