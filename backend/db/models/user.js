'use strict';
const {
  Model, Validator
} = require('sequelize');

const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject(){
      const { id, username, email }= this // context will be the user instance
      return { id , username, email }
    }

    validatePassword(password){
      return bcrypt.compareSync(password, this.hashedPassword.toString())
    }

    static async login({ credential, password }){
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where:{
          [Op.or]:{
            username: credential,
            email: credential
          }
        }
      });
      if(user && user.validatePassword(password)){
        return await User.scope('currentUser').findByPk(user.id)
      }
    }

    static async signup({ username, email, password, firstName, lastName, isArtist, previewImage}){
      const hashedPassword = bcrypt.hashSync(password)
      const user = await User.create({
        username,
        email,
        hashedPassword,
        firstName,
        lastName,
        isArtist,
        previewImage
      });
      return await User.scope('currentUser').findByPk(user.id)
    }

    static associate(models) {
      User.hasMany(models.Album,{
        foreignKey: 'userId', onDelete: 'CASCADE',  hooks: true
      });
      User.hasMany(models.Playlist,{
        foreignKey: 'userId', onDelete: 'CASCADE',  hooks: true
      });
      User.hasMany(models.Song,{
        foreignKey: 'userId', onDelete: 'CASCADE',  hooks: true
      });
      User.hasMany(models.Comment,{
        foreignKey: 'userId', onDelete: 'CASCADE', hooks: true
      });
    }
  }
  User.init(
    {
    username: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[4,30],
        isNotEmail(value){
          //isEmail is a built-in method
          if(Validator.isEmail(value)){
            throw new Error('Cannot be an email')
        }
      }
    }
  },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:false,
      validate:{
        len:[3,256],
      }
    },
    hashedPassword: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len: [60,60]
      }
    },
    firstName:{
      type: DataTypes.STRING,
      allowNull:false
    },
    lastName:{
      type: DataTypes.STRING,
      allowNull:false
    },
    isArtist:{
      type: DataTypes.BOOLEAN,
      allowNull:false
    },
    previewImage:{
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'User',
    defaultScope :{
      attributes: {
        exclude:['hashedPassword','email','createdAt','updatedAt']
      }
    },
    scopes:{
      currentUser:{
        attributes:{
          exclude:['hashedPassword','previewImage','createdAt','updatedAt',"isArtist"]
        }
      },
      loginUser:{
        attributes:{}
      }
    }
  }
);
  return User;

};
