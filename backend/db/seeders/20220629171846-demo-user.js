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
        isArtist: true,
        previewImage: 'https://dribbble.com/shots/4914645-Profile-Picture'
      },
      {
        email: 'sleepy.hallow@gmail.com',
        username: 'SleepyHallow',
        hashedPassword: bcrypt.hashSync('safepassword'),
        firstName: 'Sleepy',
        lastName:'Hallow',
        isArtist: true,
        previewImage: 'https://dribbble.com/shots/4914645-Profile-Picture'
      },
      {
        email: 'badBunny@gmail.com',
        username: 'Bad-Bunny',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'Bunny',
        lastName:'Bd',
        isArtist: false,
        previewImage: 'https://dribbble.com/shots/4914645-Profile-Picture'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
