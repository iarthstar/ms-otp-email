/**
 * @file utils.js
 * @description utilities across app
 * 
 * @author Arth Gajjar <iarthstar@gmail.com>
 */




// modules import
const colors = require('colors');
const appName = require('./../../package.json').name;

colors.setTheme({
  log    : 'white',
  info   : 'magenta',
  success: 'green',
  error  : 'red',
  warn   : 'yellow',
  app    : 'grey'
});


/**
 * 
 * @param {string} type type of log
 * @param {string} header header to identification
 * @param {...any} args arguments to log
 */
function log(type = "error", header = "", ...args) {
  args = args.map(elem => {
    if (typeof elem == 'object') {
      return JSON.stringify(elem);
    } else {
      return elem[type];
    }
  });
  switch (type) {
    case 'log'    : console.log(`[${appName.toLowerCase()}]`.app, ...args); break;
    case 'success': console.log(`[${appName.toLowerCase()}]`.app, ...args); break;
    case 'error'  : console.error(`[${appName.toLowerCase()}]`.app, ...args); break;
    case 'warn'   : console.warn(`[${appName.toLowerCase()}]`.app, ...args); break;
    case 'info'   : console.info(`[${appName.toLowerCase()}]`.app, header.toUpperCase().info, "------->", ...args);
                    console.info(`[${appName.toLowerCase()}]`.app, Date()); break;
    default: console.log(`[${appName.toLowerCase()}]`.app, text.log, ...args); break;
  }
}


/**
 * logs to indicate start of app
 * @returns {void}
 */
function initApp() {
  console.clear();
  console.log(`[${appName.toLowerCase()}]`.app, "APP STARTED".green, Date());
  console.log(`[${appName.toLowerCase()}]`.app, "---------------------------------------------------".info);
  console.log(`[${appName.toLowerCase()}]`.app, "---------------------------------------------------".info);
}


/**
 * @module utils
 */
module.exports = {
  log    : (...args) => log("log", "", ...args),
  success: (...args) => log("success", "", ...args),
  error  : (...args) => log("error", "", ...args),
  warn   : (...args) => log("warn", "", ...args),
  info   : (...args) => log("info", ...args),
  initApp,
  appName
}