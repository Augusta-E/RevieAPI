
module.exports = (sequelize, DataTypes) => {
  
  const User = sequelize.define("Users", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    full_name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull:false,
      type: DataTypes.STRING,
    },

    password:{
      allowNull: false,
      type: DataTypes.STRING
    }
  })
    User.associate = models => {
      User.hasMany(models.Reviews, {
        as: 'reviews',
        foreignKey: 'user_id',
      });
    };
  return User;
};

