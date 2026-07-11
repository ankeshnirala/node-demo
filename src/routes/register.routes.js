const express = require('express');
const authrouter = express.Router();
const {validate} = require('../middleware/validate.js')
const {registerSchema,loginSchema} = require('../validator/authvalidator.js')
const {registerControl,loginController} = require('../controllers/register.controller.js')
authrouter.post('/user/register',validate(registerSchema),registerControl);
authrouter.post('/login',validate(loginSchema),loginController);

module.exports = authrouter;
