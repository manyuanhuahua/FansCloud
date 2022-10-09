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
      "title": "thank u, next",
      "description": "Released on 2019",
      "previewImage": "https://upload.wikimedia.org/wikipedia/en/b/b2/Ariana_Grande_Thank_U_Next.png"
      },
      {
        "userId": 1,
        "title": "Yours Truly",
        "description": "Released on 2013.",
        "previewImage": "https://media.pitchfork.com/photos/5929a3b09d034d5c69bf2eac/1:1/w_320,c_limit/ebb275cf.jpg"
      },
      {
        "userId": 1,
        "title": "Positions",
        "description": "Released on 2020.",
        "previewImage": "https://media.pitchfork.com/photos/5f9c62a0cc786205a9c32981/1:1/w_320,c_limit/ariana_grande_positions_album_art.jpg"
      },{
        "userId": 1,
        "title": "Sweetener",
        "description": "Released on 2018.",
        "previewImage": "https://media.pitchfork.com/photos/5b77198cb1f53320b62b980a/1:1/w_320,c_limit/ariana%20grande_Sweetener.jpg"
      },{
        "userId": 1,
        "title": "Dangerous Woman",
        "description": "Released on 2016.",
        "previewImage": "https://media.pitchfork.com/photos/5929b5a79d034d5c69bf5077/1:1/w_320,c_limit/10eb5d56.jpg"
      },{
        "userId": 1,
        "title": "My Everything",
        "description": "Released on 2014.",
        "previewImage": "https://media.pitchfork.com/photos/5929a9cf5e6ef9596932149d/1:1/w_320,c_limit/35c4daff.jpg"
      },{
        "userId": 1,
        "title": "k bye for now",
        "description": "Released on 2019.",
        "previewImage": "https://media.pitchfork.com/photos/5e0f6b5db7c76f0009ccb5f5/1:1/w_320,c_limit/kbyefornow.jpg"
      },{
        "userId": 1,
        "title": "Carolina",
        "description": "Released on 2022.",
        "previewImage": "https://media.pitchfork.com/photos/62b521e85b6a7bdd3ea30b10/1:1/w_320,c_limit/taylor-swift-carolina.jpg"
      },{
        "userId": 1,
        "title": "Red",
        "description": "Released on 2021.",
        "previewImage": "https://media.pitchfork.com/photos/618c3ab295b32339a9955837/1:1/w_320,c_limit/Taylor-Swift-Red-Taylors-Version.jpeg"
      },{
        "userId": 1,
        "title": "Lover",
        "description": "Released on 2019.",
        "previewImage": "https://media.pitchfork.com/photos/5d2e3806e1d34500083e3d58/1:1/w_320,c_limit/TaylorSwift_Lover.jpg"
      },{
        "userId": 1,
        "title": "Reputation",
        "description": "Released on 2017.",
        "previewImage": "https://media.pitchfork.com/photos/5a008856ec4b2c2177a851c6/1:1/w_320,c_limit/reputation_taylorswift.jpg"
      },{
        "userId": 1,
        "title": "1989",
        "description": "Released on 2014.",
        "previewImage": "https://media.pitchfork.com/photos/5d37398bc4d4cb0009c58e8e/1:1/w_320,c_limit/TaylorSwift_1989.jpg"
      },
      {
          "userId": 2,
          "title": "Fearless",
          "description": "Released on 2008.",
          "previewImage": "https://media.pitchfork.com/photos/5d372f8da82ddc000869a62d/1:1/w_320,c_limit/TaylorSwift_Fearless.jpg"
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
