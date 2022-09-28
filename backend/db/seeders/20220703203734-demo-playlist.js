'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Playlists', [
      {
      userId: 1,
      name: 'Country list',
      previewImage: 'https://static.vecteezy.com/system/resources/previews/007/162/562/original/beautiful-pink-mountain-silhouette-landscape-with-fog-and-sunrise-and-sunset-in-mountains-background-outdoor-and-hiking-concept-good-for-wallpaper-site-banner-cover-poster-free-vector.jpg'
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
        previewImage: 'https://static-cse.canva.com/_next/static/assets/04_quick-features_photo-editor_frames_w600xh600_ac129099278734529ec00091f892b1f35c931bd33287bd4f40686b1d4c825573.png'
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
