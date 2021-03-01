  
const dotenv = require('dotenv');

dotenv.config();

const DEVELOPMENT = 'development';
const LOCALHOST = 'localhost';
const STAGING = 'staging';
const PRODUCTION = 'production';

const Environments = {
  [LOCALHOST]: LOCALHOST,
  [DEVELOPMENT]: DEVELOPMENT,
  [STAGING]: STAGING,
  [PRODUCTION]: PRODUCTION
};

const REDIS_PASSWORD = process.env.REDIS_PASSWORD || '';
const REDIS_DATABASE = process.env.REDIS_DATABASE || '0';
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || '6379';

const REDIS_URI = process.env.REDIS_URI || `redis://:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}/${REDIS_DATABASE}`;

module.exports = {
  environment: process.env.CURRENT_ENV || Environments[LOCALHOST],
  service: {
    otp_expiry_duration: process.env.OTP_EXPIRY_DURATION
  },
  nodemailer: {
    email: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS,
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: process.env.NODEMAILER_SECURE,
  },
  server: {
    PORT: process.env.PORT || 8080,
  },
  database: {
    [LOCALHOST]: {
      REDIS: {
        uri: REDIS_URI
      }
    },
    [DEVELOPMENT]: {
      REDIS: {
        uri: process.env.REDIS_URL
      }
    },
    [STAGING]: {
      REDIS: {
        uri: process.env.REDIS_URL
      }
    },
    [PRODUCTION]: {
      REDIS: {
        uri: process.env.REDIS_URL
      }
    }
  },
  api: {
    prefix: ''
  }
};