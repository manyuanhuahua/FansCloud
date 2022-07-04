'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Song.belongsToMany(models.Playlist, {through: models.SongPlaylist});
      Song.belongsTo(models.User,{ foreignKey: 'userId'});
      Song.belongsTo(models.Album,{ foreignKey: 'albumId'});
      Song.hasMany(models.Comment, { foreignKey: 'songId', onDelete: 'CASCADE',  hooks: true })

    }


  }
  Song.init({
    userId: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    albumId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    audioUrl: DataTypes.STRING,
    previewImage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};
