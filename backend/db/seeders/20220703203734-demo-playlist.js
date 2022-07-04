'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Playlists', [
      {
      userId: 1,
      name: 'Country list',
      previewImage: 'playlist image'
      },
      {
        userId: 1,
        name: 'fav songs',
        previewImage: 'playlist image'
      },
      {
        userId: 2,
        name: 'Workout',
        previewImage: 'playlist image'
      },
      {
        userId: 3,
        name: 'Gym Hip-hop',
        previewImage: 'playlist image'
      },
      {
          userId: 3,
          name: 'Chill Tunes',
          previewImage: 'playlist image'
      },
  ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Playlists', null, {});
  }
};
