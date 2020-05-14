/**
 * @file loaders/index.js
 * @description all the loaders required for the server are here
 * 
 * @author Arth Gajjar <iarthstar@gmail.com>
 */



// modules import
const utils = require('./../utils');
const expressLoader = require('./express');
const redisLoader = require('./redis');
const nodemailerLoader = require('./nodemailer');

module.exports = async () => {

  await redisLoader();
  utils.success('Redis Initialized');
  
  await nodemailerLoader();
  utils.success('NodeMailer Initialized');
  
  await expressLoader();
  utils.success('Express Intialized');

};