const { get } = require('lodash');
const { METHOD, POST, GET, PUT, PATCH, DELETE } = require('../../constants');
const { throwError } = require('../../utils');
const G = require('../../../globals');

const { REDIS_KEY_GENERATED_OTPS } = require('../../../constants');

const verify = async (method, req, res) => {

  switch (method) {

    case METHOD[POST]: {
      const otp = get(req.body, 'otp') || null;
      if (!Boolean(otp)) throwError("OTP missing");

      const email = get(req.body, 'email') || null;
      if (!Boolean(email)) throwError("Email missing");

      const isEmailValid = /^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[A-Z0-9-]+\.)+[A-Z]{2,6}$/.test(email);
      if (!isEmailValid) throwError("Invalid Email");

      const REDIS_KEY = `OTP_EMAIL_API:EMAIL:${email}`;
      let ret = await G.REDIS.get(REDIS_KEY);
      if (!ret) { return { success: true, data: "EXPIRED" }; }

      if (String(otp) !== ret) {
        return { success: true, data: "INCORRECT" };
      } else {
        await G.REDIS.del(REDIS_KEY);

        const generated_otps = await G.REDIS.get(REDIS_KEY_GENERATED_OTPS);
        delete generated_otps[otp];

        await G.REDIS.set(REDIS_KEY_GENERATED_OTPS, JSON.stringify(generated_otps));

        return {
          success: true,
          data: "CORRECT"
        };
      }
    }; break;



    default: return ({});
  };
};

module.exports = {
  verify
};