'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {

    static associate(models) {
      Song.belongsToMany(models.Playlist, {through: models.SongPlaylist});
      Song.belongsTo(models.User, { foreignKey: 'userId', as: 'Artist' } );
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
    defaultScope :{
      attributes: {}},
    scopes:{
      artistScope(){
        const {User} = require('../models')

        return {include: [{
          model: User,
          as: 'Artist',
          where: {
            isArtist: true
        },
        attributes: ['id','username','previewImage'],

        }],
      }
    },
    albumScope(){
      const { Album } = require('../models')
      return {
        include:[{
          model: Album,
        }],
        attributes: ['id','title','previewImage']
      }
    }
  },
  });
 return Song;
};
