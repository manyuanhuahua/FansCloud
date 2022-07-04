'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Comments', [
      {
      "userId": 1,
      "songId": 1,
      "body": "I love this song!"
    },
    {
      "userId": 1,
      "songId": 2,
      "body": "THIS IS AMAZING"
    },
    {
      "userId": 2,
      "songId": 2,
      "body": "THIS IS AN AMAZING SONG"
    },
    {
      "userId": 3,
      "songId": 2,
      "body": "Future my dream collab!"
    },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
     await queryInterface.bulkDelete('Comments', null, {});
  }
};
