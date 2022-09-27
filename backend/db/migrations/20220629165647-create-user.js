'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique:true
      },
      email: {
        type: Sequelize.STRING,
        unique:false,
        allowNull:false
      },
      hashedPassword: {
        type: Sequelize.STRING.BINARY,//is it same as direct binary type
        allowNull:false
      },
      firstName:{
        type: Sequelize.STRING,
        unique:false,
        allowNull:false
      },
      lastName:{
        type: Sequelize.STRING,
        unique:false,
        allowNull:false
      },
      previewImage:{
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
