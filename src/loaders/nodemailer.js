/**
 * @file nodemailer.js
 * @description nodemailer js configuration
 * 
 * @author Arth Gajjar <iarthstar@gmail.com>
 */



// modules import
const nodemailer = require("nodemailer");

const config = require('./../config');
const G = require('./../globals');

module.exports = async () => {

  const { nodemailer: { email, pass, host, port, secure } } = config;

  G.MAILER = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: email,
      pass: pass
    }
  });

};