'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      user_id: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      landlordReview: {
        allowNull: false,
        type: Sequelize.TEXT     
       },
      environmentReview: {
        allowNull: false,
        type: Sequelize.TEXT    
       },
       ammenitiesQuality: {
        allowNull: false,
        type: Sequelize.TEXT    
       },
      image: {
        allowNull: true,
        type: Sequelize.STRING     
       },
      video: {
        allowNull: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Reviews');
  }
};