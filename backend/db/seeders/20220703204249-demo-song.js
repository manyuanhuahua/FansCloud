'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Songs', [{
      "userId": 1,
      "albumId": 1,
      "title": "imagine",
      "description": "A song about the past.",
      "audioUrl": "https://mp3.filmisongs.com/go.php?id=Imagine%20Song%20Download%20Mp3%20Ariana%20Grande.mp3",
      "previewImage": "https://64.media.tumblr.com/f72d10b7dae4b79850ee00cb6135a14c/tumblr_plky19oySQ1u80htao1_1280.jpg"
    },
    {
      "userId": 1,
      "albumId": 1,
      "title": "Bang Bang",
      "description": "A song about the Observatory.",
      "audioUrl": "https://mp3.filmisongs.com/go.php?id=Bang%20Bang%20Song%20Download%20Mp3%20Jessie%20J%20Ft%20Ariana%20Grande,%20Nicki%20Minaj.mp3",
      "previewImage": "https://merrygoroundmagazine.com/wp-content/uploads/2019/03/Thank-U-Next.jpg"
    },
    {
      "userId": 1,
      "albumId": 1,
      "title": "Side to Side",
      "description": "A song about feelings of sunshine.",
      "audioUrl": "https://mp3.filmisongs.com/go.php?id=Ariana%20Grande%20-%20Side%20To%20Side%20Mp3%20Song%20Download%20Ft%20Nicki%20Minaj.mp3",
      "previewImage": "https://www.arthipo.com/image/cache/catalog/poster/music/music160-taylor-swift-poster-singer-sarkici-sanatci-afis-muzik-500x500w.jpg"
    },
    {
      "userId": 1,
      "albumId": 1,
      "title": "Main Thing",
      "description": "A song about our love.",
      "audioUrl": "https://mp3.filmisongs.com/go.php?id=main%20thing%20-%20Ariana%20Grande.mp3",
      "previewImage": "https://i.ytimg.com/vi/rFjJs6ZjPe8/maxresdefault.jpg"
    },
    {
      "userId": 1,
      "albumId": 1,
      "title": "Someone Like U",
      "description": "A song about some small talks between friends.",
      "audioUrl": "https://mp3.filmisongs.com/go.php?id=someone%20like%20u%20-%20Ariana%20Grande.mp3",
      "previewImage": "https://studiosol-a.akamaihd.net/tb/letras-blog/wp-content/uploads/2020/12/23d407b-as_melhores_ariana_grande_1390x780-300x168.jpg"
    },
    {
      "userId": 1,
      "albumId": 2,
      "title": "Breathin",
      "description": "A song about nothing.",
      "audioUrl": "https://mp3.filmisongs.com/go.php?id=someone%20like%20u%20-%20Ariana%20Grande.mp3",
      "previewImage": "https://www.billboard.com/wp-content/uploads/media/02-Ariana-Grande-breathin-2018-billboard-1548.jpg"
    },
    {
      "userId": 1,
      "albumId": 2,
      "title": "Positions",
      "description": "A song about the past 7 summers.",
      "audioUrl": "https://mp3.filmisongs.com/go.php?id=positions%20-%20Ariana%20Grande.mp3",
      "previewImage": "https://st1.bollywoodlife.com/wp-content/uploads/2018/12/Ariana-Grande.png"
    },
    {
      "userId": 1,
      "albumId": 2,
      "title": "Thank U, NEXT",
      "description": "A song about some small talks between friends.",
      "audioUrl": "https://mp3.filmisongs.com/go.php?id=%E2%80%8BThank%20U,%20Next%20Song%20-%20Ariana%20Grande.mp3",
      "previewImage": "https://media.newyorker.com/photos/5bedcc42cf7c002cfd8329a3/master/pass/Mejia-Ariana-Grande.jpg"
    },
    {
      "userId": 1,
      "albumId": 3,
      "title": "worst behavior",
      "description": "A song about nothing.",
      "audioUrl": "https://mp3.filmisongs.com/go.php?id=%E2%80%8BThank%20U,%20Next%20Song%20-%20Ariana%20Grande.mp3",
      "previewImage": "https://i1.sndcdn.com/artworks-z7O6UF0jUh2JizrC-yJ53Yw-t500x500.jpg"
    },
    {
      "userId": 1,
      "albumId": 3,
      "title": "Break Up With Your Girlfriend, I'm Bored",
      "description": "A song about the past 7 summers.",
      "audioUrl": "https://mp3.filmisongs.com/go.php?id=Break%20up%20with%20your%20girlfriend,%20i%27m%20bored%20Mp3%20Song%20By%20Ariana%20Grande.mp3",
      "previewImage": "https://assets.teenvogue.com/photos/5c5d908df17db825c1f97f26/16:9/w_527,h_296,c_limit/tout.jpg"
    },
    {
      "userId": 1,
      "albumId": 3,
      "title": "Medicine",
      "description": "A song about some small talks between friends.",
      "audioUrl": "https://mp3.filmisongs.com/go.php?id=Medicine%20-%20Taylor%20Swift.mp3",
      "previewImage": "https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2022/06/2.-Overlapping.jpg"
    },
    {
      "userId": 1,
      "albumId": 4,
      "title": "Look What You Made Me Do",
      "description": "A song about nothing.",
      "audioUrl": "https://mp3.filmisongs.com/go.php?id=Look%20What%20You%20Made%20Me%20Do%20-%20Taylor%20Swift.mp3",
      "previewImage": "https://upload.wikimedia.org/wikipedia/en/6/68/Taylor_Swift_-_Look_What_You_Made_Me_Do.png"
    },
    {
      "userId": 1,
      "albumId": 4,
      "title": "Love Story",
      "description": "A song about the past 7 summers.",
      "audioUrl": "https://mp3.filmisongs.com/go.php?id=Love%20Story%20-%20Taylor%20Swift.mp3",
      "previewImage": "https://y.yarn.co/d54d7bca-1c01-465f-8221-40becce90a81_screenshot.jpg"
    },
    {
      "userId": 1,
      "albumId": 4,
      "title": "Mr Perfectly Fine",
      "description": "A song about some small talks between friends.",
      "audioUrl": "https://mp3.filmisongs.com/go.php?id=Mr%20Perfectly%20Fine%20-%20Taylor%20Swift.mp3",
      "previewImage": "https://pbs.twimg.com/media/E8W-o7NVEAgSDCQ.jpg"
    },
    {
      "userId": 1,
      "albumId": 5,
      "title": "Only The Young",
      "description": "A song about nothing.",
      "audioUrl": "https://mp3.filmisongs.com/go.php?id=Only%20The%20Young%20Mp3%20By%20Taylor%20Swift.mp3",
      "previewImage": "https://upload.wikimedia.org/wikipedia/en/6/69/Taylor_Swift_-_Only_the_Young.png"
    },
    {
      "userId": 1,
      "albumId": 5,
      "title": "The Man",
      "description": "A song about the past 7 summers.",
      "audioUrl": "https://mp3.filmisongs.com/go.php?id=The%20Man%20Mp3%20By%20Taylor%20Swift.mp3",
      "previewImage": "https://cdn.mamamia.com.au/wp/wp-content/uploads/2020/02/28130728/the-man-hidden-details-bouquet.jpg"
    },
    {
      "userId": 1,
      "albumId": 5,
      "title": "Look What You Made Me Do",
      "description": "A song about nothing.",
      "audioUrl": "https://mp3.filmisongs.com/go.php?id=Look%20What%20You%20Made%20Me%20Do%20-%20Taylor%20Swift.mp3",
      "previewImage": "https://media.wonderlandmagazine.com/uploads/2020/02/tay.jpg"
    },
    {
      "userId": 1,
      "albumId": 6,
      "title": "Love Story",
      "description": "A song about the past 7 summers.",
      "audioUrl": "https://mp3.filmisongs.com/go.php?id=Love%20Story%20-%20Taylor%20Swift.mp3",
      "previewImage": "https://www.nme.com/wp-content/uploads/2021/02/fearless_cover-2-696x442.jpg"
    },
    {
      "userId": 1,
      "albumId": 6,
      "title": "Mr Perfectly Fine",
      "description": "A song about some small talks between friends.",
      "audioUrl": "https://mp3.filmisongs.com/go.php?id=Mr%20Perfectly%20Fine%20-%20Taylor%20Swift.mp3",
      "previewImage": "https://pbs.twimg.com/media/E8W-o7NVEAgSDCQ.jpg"
    },
    {
      "userId": 1,
      "albumId": 7,
      "title": "Only The Young",
      "description": "A song about nothing.",
      "audioUrl": "https://mp3.filmisongs.com/go.php?id=Only%20The%20Young%20Mp3%20By%20Taylor%20Swift.mp3",
      "previewImage": "https://upload.wikimedia.org/wikipedia/en/6/69/Taylor_Swift_-_Only_the_Young.png"
    },
    {
      "userId": 1,
      "albumId": 7,
      "title": "The Man",
      "description": "A song about the past 7 summers.",
      "audioUrl": "https://mp3.filmisongs.com/go.php?id=The%20Man%20Mp3%20By%20Taylor%20Swift.mp3",
      "previewImage": "https://cdn.mamamia.com.au/wp/wp-content/uploads/2020/02/28130728/the-man-hidden-details-bouquet.jpg"
    },
    {
      "userId": 1,
      "albumId": 8,
      "title": "Blank Space",
      "description": "A song about some small talks between friends.",
      "audioUrl": "https://mp3.filmisongs.com/go.php?id=Blank%20Space%20-%20Taylor%20Swift.mp3",
      "previewImage": "https://www.rollingstone.com/wp-content/uploads/2018/06/rs-174215-Screen-Shot-2014-11-11-at-9.11.53-AM.png"
    },
    {
      "userId": 1,
      "albumId": 8,
      "title": "Delicate",
      "description": "A song about nothing.",
      "audioUrl": "https://mp3.filmisongs.com/go.php?id=Delicate%20-%20Taylor%20Swift.mp3",
      "previewImage": "https://hips.hearstapps.com/elleuk.cdnds.net/18/11/1520851900-taylorswift2.jpg"
    },
    {
      "userId": 1,
      "albumId": 9,
      "title": "Bad Blood",
      "description": "A song about the past 7 summers.",
      "audioUrl": "https://mp3.filmisongs.com/go.php?id=Bad%20Blood%20-%20Taylor%20Swift,%20Kendrick%20Lamar.mp3",
      "previewImage": "https://upload.wikimedia.org/wikipedia/en/9/9b/Taylor_Swift_Feat._Kendrick_Lamar_-_Bad_Blood_%28Official_Single_Cover%29.png"
    },
    {
      "userId": 1,
      "albumId": 9,
      "title": "Shake It Off",
      "description": "A song about some small talks between friends.",
      "audioUrl": "https://mp3.filmisongs.com/go.php?id=Shake%20It%20Off%20-%20Taylor%20Swift.mp3",
      "previewImage": "https://ww2.kqed.org/app/uploads/sites/12/2014/08/taylor-swift.jpg"
    },
    {
      "userId": 1,
      "albumId": 10,
      "title": "The Archer",
      "description": "A song about nothing.",
      "audioUrl": "https://mp3.filmisongs.com/go.php?id=The%20Archer%20Mp3%20Song%20by%20Taylor%20Swift.mp3",
      "previewImage": "https://upload.wikimedia.org/wikipedia/en/0/0f/Taylor_Swift_-_The_Archer.png"
    },
    {
      "userId": 1,
      "albumId": 10,
      "title": "You Need To Calm Down",
      "description": "A song about the past 7 summers.",
      "audioUrl": 'https://mp3.filmisongs.com/go.php?id=You%20Need%20To%20Calm%20Down%20Mp3%20Song%20by%20Taylor%20Swift.mp3',
      "previewImage": "http://pixel.nymag.com/imgs/daily/vulture/2019/06/17/17-t-swift-yntcd.png"
    },
    {
      "userId": 1,
      "albumId": 10,
      "title": "Diamonds",
      "description": "A song about some small talks between friends.",
      "audioUrl": "https://mp3.filmisongs.com/go.php?id=Rihanna%20-%20Diamonds%20Mp3%20Song%20Download.mp3",
      "previewImage": "https://downloadmusicas.online/wp-content/uploads/2021/07/diamonds-rihanna-baixar.jpeg"
    },
    {
      "userId": 1,
      "albumId": 11,
      "title": "Beautiful Mistakes",
      "description": "A song about nothing.",
      "audioUrl": "https://mp3.filmisongs.com/go.php?id=Beautiful%20Mistakes%20-%20Maroon%205.mp3",
      "previewImage": "https://static.toiimg.com/thumb/msid-81328641,width-400,resizemode-4/81328641.jpg"
    },
    {
      "userId": 1,
      "albumId": 11,
      "title": "Memories",
      "description": "A song about the past 7 summers.",
      "audioUrl": "https://mp3.filmisongs.com/go.php?id=Memories%20Mp3%20By%20and%20Maroon%205.mp3",
      "previewImage": "https://i1.sndcdn.com/artworks-000601183339-uajc0g-t500x500.jpg"
    },
    {
      "userId": 1,
      "albumId": 12,
      "title": "Firework",
      "description": "A song about some small talks between friends.",
      "audioUrl": "https://mp3.filmisongs.com/go.php?id=Katy%20Perry%20-%20Firework.mp3",
      "previewImage": "https://4.bp.blogspot.com/-glHw2S0Isoc/UGS1Kg0Uc3I/AAAAAAAAAZw/NMfciiX-4Ug/s1600/katy-perry-firework-2.png"
    },
    {
      "userId": 1,
      "albumId": 12,
      "title": "Never Really Over",
      "description": "A song about nothing.",
      "audioUrl": "https://mp3.filmisongs.com/go.php?id=Never%20Really%20Over%20Mp3%20Song%20by%20Katy%20Perry.mp3",
      "previewImage": "https://www.udiscovermusic.com/wp-content/uploads/2019/05/Katy-Perry-Never-Really-Over-Video.jpg"
    },
    {
      "userId": 1,
      "albumId": 12,
      "title": "She",
      "description": "A song about the past 7 summers.",
      "audioUrl": "https://mp3.filmisongs.com/go.php?id=She%20-%20Selena%20Gomez.mp3",
      "previewImage": "https://i.pinimg.com/736x/2c/dc/51/2cdc511d98beb8e73ec121574687d4b1.jpg"
    },
  ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Songs', null, {});
  }
};
