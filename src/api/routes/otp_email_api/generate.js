const utils = require('../../../utils');
const { get } = require('lodash');
const { METHOD, POST, GET, PUT, PATCH, DELETE } = require('../../constants');
const G = require('../../../globals');
const moment = require('moment');

const { REDIS_KEY_GENERATED_OTPS, OTP_DIGITS_LENGTH } = require('../../../constants');

const { service: { otp_expiry_duration } } = require('./../../../config');


const generate = async (method, req, res) => {

  switch (method) {

    case METHOD[POST]: {
      const email = get(req.body, 'email');
      if (!Boolean(email)) { throw "Email missing"; }

      const REDIS_KEY = `OTP_EMAIL_API:EMAIL:${email}`;
      let ret = await G.REDIS.get(REDIS_KEY);
      if (ret) { utils.info("CACHED", REDIS_KEY); return { success: true }; }

      const generated_otps = JSON.parse(await G.REDIS.get(REDIS_KEY_GENERATED_OTPS));
      otp = generateOTP(generated_otps);

      generated_otps[otp] = moment().add(otp_expiry_duration, 's').toISOString();

      await G.REDIS.set(REDIS_KEY_GENERATED_OTPS, JSON.stringify(generated_otps));
      await G.REDIS.set(REDIS_KEY, String(otp), 'EX', otp_expiry_duration);

      
      let email_options = {
        from: 'Micro Service OTP Email <ias.nodemailer@gmail.com>',
        to: email,
        subject: 'MS - OTP - EMAIL',
        text: `OTP : ${otp}`,
        html: `<p>OTP : <b>${otp}</b></p>`
      };

      try {
        return { success: await sendMail(email_options) };
      } catch (err) {

        await G.REDIS.del(REDIS_KEY);
        
        const generated_otps = await G.REDIS.get(REDIS_KEY_GENERATED_OTPS);
        delete generated_otps[otp];
        
        await G.REDIS.set(REDIS_KEY_GENERATED_OTPS, JSON.stringify(generated_otps));

        throw "Error sending OTP mail...";
      }

    }; break;



    default: return ({});
  };
};

const sendMail = (message) => new Promise((resolve, reject) => {
  G.MAILER.sendMail(message, function (error, info) {
    if (error) {
      console.log("error is " + error);
      reject(false);
    }
    else {
      console.log('Email sent: ' + info.response);
      resolve(true);
    }
  });
});

const randomNumber = () => {
  let otp = parseInt(Math.random().toString().slice(2, 2 + OTP_DIGITS_LENGTH)) + '';

  while (otp.length !== OTP_DIGITS_LENGTH) {
    otp = parseInt(otp + Math.random().toString().slice(2, 3)) + '';
  }

  return otp;
};

const generateOTP = (generated_otps) => {
  let otp = randomNumber();

  while (generated_otps.hasOwnProperty(otp)) {
    if (moment(generated_otps[otp]).isBefore(moment())) {
      delete generated_otps[otp];
    } else {
      otp = randomNumber();
    }
  }

  return otp;
}

module.exports = {
  generate
};