const express = require('express')
const {User, Song} = require('../../db/models');
const { route } = require('./song');

const {check}=require('express-validator');
const {handleValidationErrors}=require('../../utils/validation')
const {requireAuth,createrAuth}=require('../../utils/auth')


const router = express.Router();




module.exports= router
