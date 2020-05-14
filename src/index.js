  
/**
 * @file index.js
 * @description Entry point of App
 * 
 * @author Arth Gajjar <iarthstar@gmail.com>
 * @version 1.0
 */




//
// ─────────────────────────────────────────────────────────────── SERVER ─────
//


// modules import
const utils = require("./utils");
const loaders = require('./loaders');

exports.startServer = async () => {

  await loaders();
  utils.info("LOADERS", "DONE");

};