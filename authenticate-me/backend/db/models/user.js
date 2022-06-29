'use strict';
const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject(){
      const { id, username, email }= this // context will be the user instance
      return { id , username, email}
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

    static async signup({ username, email, password}){
      const hashedPassword = bcrypt.hashSync(password)
      const user = await User.create({
        username,
        email,
        hashedPassword
      });
      return await User.scope('currentUser').findByPk(user.id)
    }

    static associate(models) {
      // define association here
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
      validate:{
        len:[3,256],
        isEmail(value){
          if(!(Validator.isEmail(value))){
            throw new Error('Should be an Email')
          }
        }
      }
    },
    hashedPassword: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len: [60,60]
      }
    }
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
          exclude:['hashedPassword']
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
