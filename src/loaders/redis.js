/**
 * @file redis.js
 * @description redis js configuration
 * 
 * @author Arth Gajjar <iarthstar@gmail.com>
 */



// modules import
const Redis = require('ioredis');

const utils = require('../utils');
const config = require('../config');
const G = require('../globals');

const { REDIS_KEY_GENERATED_OTPS } = require('../constants');

module.exports = async () => {

  const { database: db, environment: env } = config;
  const { uri } = db[env].REDIS;
  G.REDIS = new Redis(uri);

  G.REDIS.connect(async () => {
    let ret = await G.REDIS.get(REDIS_KEY_GENERATED_OTPS);
    if (ret) { 
      utils.info('OTPS', 'INTACT'); 
    } else {
      utils.error('!!!! --- OTPS LOST --- !!!!'); 
      G.REDIS.set(REDIS_KEY_GENERATED_OTPS, JSON.stringify({}));
    }
  });

};