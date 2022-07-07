'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Songs', [{
      "userId": 1,
      "albumId": 1,
      "title": "Yesterday",
      "description": "A song about the past.",
      "audioUrl": "audio url",
      "previewImage": "image url"
    },
    {
      "userId": 1,
      "albumId": 1,
      "title": "Observatory",
      "description": "A song about the Observatory.",
      "audioUrl": "audio url",
      "previewImage": "image url"
    },
    {
      "userId": 1,
      "albumId": 1,
      "title": "Trapped In The Sun",
      "description": "A song about feelings of sunshine.",
      "audioUrl": "audio url",
      "previewImage": "image url"
    },
    {
      "userId": 1,
      "albumId": 2,
      "title": "Fall In Love",
      "description": "A song about our love.",
      "audioUrl": "audio url",
      "previewImage": "image url"
    },
    {
      "userId": 1,
      "albumId": 2,
      "title": "People Talk",
      "description": "A song about some small talks between friends.",
      "audioUrl": "audio url",
      "previewImage": "image url"
    },
    {
      "userId": 2,
      "albumId": 3,
      "title": "5 Foot 9",
      "description": "A song about nothing.",
      "audioUrl": "audio url",
      "previewImage": "image url"
    },
    {
      "userId": 2,
      "albumId": 3,
      "title": "7 Summers",
      "description": "A song about the past 7 summers.",
      "audioUrl": "audio url",
      "previewImage": "image url"
    },
  ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Songs', null, {});
  }
};
