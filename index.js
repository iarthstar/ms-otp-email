/**
 * @file index.js
 * @description Entry point of App
 * 
 * @author Arth Gajjar <iarthstar@gmail.com>
 * @version 1.0
 */




//
// ────────────────────────────────────────────────────────── INIT APP ─────
//

const utils = require("./src/utils");
utils.initApp();

// modules import
const { startServer } = require('./src');

// Starting Server
startServer();