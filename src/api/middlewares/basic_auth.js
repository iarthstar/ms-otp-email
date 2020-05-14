const utils = require('./../../utils');

module.exports = async (_method, req, res, next) => {

  if (req.path === '/users/authenticate') {
    return next();
  }

  // check for basic auth header
  if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
    return res.status(401).json({ message: 'Missing Authorization Header' });
  }

  // verify auth credentials
  const base64Credentials = req.headers.authorization.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');
  const user = await ((username, password) => { return username == "1234" && password == "1234" })(username, password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid Authentication Credentials' });
  }

  // attach user to request object
  req.user = user

  next();

};