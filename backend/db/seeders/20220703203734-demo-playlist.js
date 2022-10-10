'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Playlists', [
      {
      userId: 1,
      name: 'Country list',
      previewImage: 'https://thumbs.dreamstime.com/b/lone-trees-landscape-17839931.jpg'
      },
      {
        userId: 1,
        name: 'fav songs',
        previewImage: 'https://image.shutterstock.com/image-photo/abstract-contemporary-art-collage-portrait-260nw-2060087966.jpg'
      },
      {
        userId: 2,
        name: 'Workout',
        previewImage: 'https://blog.hootsuite.com/wp-content/uploads/2022/07/social-media-image-sizes-guide.png'
      },
      {
        userId: 3,
        name: 'Gym Hip-hop',
        previewImage: 'https://png.pngtree.com/thumb_back/fh260/back_pic/04/53/06/825860f62480c36.jpg'
      },
      {
          userId: 3,
          name: 'Chill Tunes',
          previewImage: 'https://files.realpython.com/media/Image-Processing-in-Python-With-Pillow_Watermarked.b86d7e55f981.jpg'
      },
  ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Playlists', null, {});
  }
};
