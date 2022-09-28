'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'john.smith@gmail.com',
        username: 'JohnSmith',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'John',
        lastName:'Smith',
        previewImage: 'https://p1.itc.cn/q_70/images01/20211026/a2bd2d0936f94e919a444c6adc24b6b3.jpeg'
      },
      {
        email: 'sleepy.hallow@gmail.com',
        username: 'SleepyHallow',
        hashedPassword: bcrypt.hashSync('safepassword'),
        firstName: 'Sleepy',
        lastName:'Hallow',
        previewImage: 'https://s3.cloudbreakr.io/ig-profile-pic/4047655943.e0f0dec7e73e3e1e.jpeg'
      },
      {
        email: 'badBunny@gmail.com',
        username: 'Bad-Bunny',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'Bunny',
        lastName:'Bd',
        previewImage: 'https://static-cdn.jtvnw.net/jtv_user_pictures/0c5e295a-ae57-4998-8cd8-ce97d7dac268-profile_image-300x300.png'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
