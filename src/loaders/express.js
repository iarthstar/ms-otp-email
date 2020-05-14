/**
 * @file express.js
 * @description express js configuration
 * 
 * @author Arth Gajjar <iarthstar@gmail.com>
 */



// modules import
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const utils = require('./../utils');
const routes = require('./../api');
const config = require('./../config');
const G = require('./../globals');

module.exports = async () => {

  G.EXPRESS = await express()
    // .get('/', (_req, res) => res.sendFile("./index.html", { root: __dirname.replace(/\/src\/loaders/, "") }))
    .get('/', (_req, res) => res.redirect('https://documenter.getpostman.com/view/2632863/RWgp1ewx'))
    .get('/status', (_req, res) => res.status(200).end())
    .head('/status', (_req, res) => res.status(200).end())
    .enable('trust proxy')

    .use(cors())
    .use(helmet())

    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))

    .use(config.api.prefix, routes())

    .use((_req, _res, next) => {
      const err = new Error('Something went wrong...')
      err['status'] = 404;
      next(err)
    })
    .use((err, _req, res, _next) => {
      return res.json({
        error: true,
        error_message: err.message
      }).status(err.status || 500)
    })
    
    .listen(config.server.PORT, err => {
      if (err) utils.log(err);
      else utils.info('Server', `http://localhost:${config.server.PORT}`);
    })
};