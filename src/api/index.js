/**
 * @file api/index.js
 * @description all the exposed routes are here
 * 
 * @author Arth Gajjar <iarthstar@gmail.com>
 */




// modules import
const { Router } = require('express');
const G = require('./../globals');

const { MIDDLE___, POST_____, GET______, PUT______, PATCH____, DELETE___ } = require('./utils');

const middleware = require('./middlewares');

const req_res = require('./routes/req_res');
const otp_email_api = require('./routes/otp_email_api');

module.exports = () => {

  G.ROUTE = Router();

  //
  // ─────────────────────────────────────────────────────────── ROUTES ───────
  //

  /*------------------- REQRES APIs -------------------*/

  // ReqRes CRUD
  MIDDLE___`/req_res/users                              ${middleware.basicAuth}`
  POST_____`/req_res/users                              ${req_res.users}`
  GET______`/req_res/users/:id                          ${req_res.users}`
  PUT______`/req_res/users/:id                          ${req_res.users}`
  DELETE___`/req_res/users/:id                          ${req_res.users}`



  /*------------- OTP EMAIL APIs --------------*/

  // Generate OTP
  POST_____`/otp_email_api/generate             ${otp_email_api.generate}`
  
  // Verify OTP
  POST_____`/otp_email_api/verify               ${otp_email_api.verify}`

  //
  // ──────────────────────────────────────────────────────────────────────────
  //


  return G.ROUTE;
};