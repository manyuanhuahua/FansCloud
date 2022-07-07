'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert('Albums', [
      {
      "userId": 1,
      "title": "Time",
      "description": "An album about time.",
      "previewImage": "image url"
      },
      {
        "userId": 1,
        "title": "Summer without you",
        "description": "An album about last summer.",
        "previewImage": "image url"
      },
      {
          "userId": 2,
          "title": "Future",
          "description": "Some thoughts about future.",
          "previewImage": "image url"
      },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
     await queryInterface.bulkDelete('Albums', null, {});
  }
};
