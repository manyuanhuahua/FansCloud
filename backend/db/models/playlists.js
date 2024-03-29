'use strict';
const {
  Model
} = require('sequelize');
const songplaylists = require('./songplaylists');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Playlist.belongsToMany(models.Song, {through: models.SongPlaylist, foreignKey: 'playlistId', otherKey: 'songId'})
      Playlist.belongsTo(models.User, { foreignKey: 'userId'},  { as: 'Artist' });
    }
  }
  Playlist.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    previewImage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Playlist',
  });
  return Playlist;
};
