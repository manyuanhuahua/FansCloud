'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert('SongPlaylists', [
      {
      songId: 1,
      playlistId: 1,
      },
      {
        songId: 2,
        playlistId: 1,
        },
      {
          songId: 3,
          playlistId: 1,
      },
      {
        songId: 1,
        playlistId: 2,
    },
    {
      songId: 4,
      playlistId: 2,
  },
  {
    songId: 5,
    playlistId: 2,
},
{
  songId: 3,
  playlistId: 3,
},
{
  songId: 6,
  playlistId: 3,
},
{
  songId: 4,
  playlistId: 4,
},
{
  songId: 7,
  playlistId: 4,
},
{
  songId: 2,
  playlistId: 5,
},
{
  songId: 3,
  playlistId: 5,
},
{
  songId: 5,
  playlistId: 5,
},
{
  songId: 7,
  playlistId: 5,
},
  ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
