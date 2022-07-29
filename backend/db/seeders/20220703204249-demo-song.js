'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Songs', [{
      "userId": 1,
      "albumId": 1,
      "title": "Bang Bang",
      "description": "A song about the past.",
      "audioUrl": "https://mp3.filmisongs.com/go.php?id=Bang%20Bang%20Song%20Download%20Mp3%20Jessie%20J%20Ft%20Ariana%20Grande,%20Nicki%20Minaj.mp3",
      "previewImage": "https://ylhsthewrangler.com/wp-content/uploads/2016/06/dangerouswoman-900x900.jpg"
    },
    {
      "userId": 1,
      "albumId": 1,
      "title": "Side To Side",
      "description": "A song about the Observatory.",
      "audioUrl": "https://mp3.filmisongs.com/go.php?id=Ariana%20Grande%20-%20Side%20To%20Side%20Mp3%20Song%20Download%20Ft%20Nicki%20Minaj.mp3",
      "previewImage": "https://merrygoroundmagazine.com/wp-content/uploads/2019/03/Thank-U-Next.jpg"
    },
    {
      "userId": 1,
      "albumId": 1,
      "title": "Medicine",
      "description": "A song about feelings of sunshine.",
      "audioUrl": "https://mp3.filmisongs.com/go.php?id=Medicine%20-%20Taylor%20Swift.mp3",
      "previewImage": "https://www.arthipo.com/image/cache/catalog/poster/music/music160-taylor-swift-poster-singer-sarkici-sanatci-afis-muzik-500x500w.jpg"
    },
    {
      "userId": 1,
      "albumId": 2,
      "title": "My Perfectly Fine",
      "description": "A song about our love.",
      "audioUrl": "https://mp3.filmisongs.com/go.php?id=Mr%20Perfectly%20Fine%20-%20Taylor%20Swift.mp3",
      "previewImage": "https://i.ytimg.com/vi/rFjJs6ZjPe8/maxresdefault.jpg"
    },
    {
      "userId": 1,
      "albumId": 2,
      "title": "Only The Young",
      "description": "A song about some small talks between friends.",
      "audioUrl": "https://mp3.filmisongs.com/go.php?id=Only%20The%20Young%20Mp3%20By%20Taylor%20Swift.mp3",
      "previewImage": "https://i.ytimg.com/vi/RDO31luXNj8/maxresdefault.jpg"
    },
    {
      "userId": 2,
      "albumId": 3,
      "title": "Shake It Off",
      "description": "A song about nothing.",
      "audioUrl": "https://mp3.filmisongs.com/go.php?id=Shake%20It%20Off%20-%20Taylor%20Swift.mp3",
      "previewImage": "https://upload.wikimedia.org/wikipedia/en/c/c4/Taylor_Swift_-_Shake_It_Off.png"
    },
    {
      "userId": 2,
      "albumId": 3,
      "title": "The Man",
      "description": "A song about the past 7 summers.",
      "audioUrl": "https://mp3.filmisongs.com/go.php?id=The%20Man%20Mp3%20By%20Taylor%20Swift.mp3",
      "previewImage": "https://www.rollingstone.com/wp-content/uploads/2020/02/TaylorSwiftTheMan.jpg"
    },
  ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Songs', null, {});
  }
};
