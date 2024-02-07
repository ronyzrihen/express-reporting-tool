const logEmitter = require('./logger/logger');

exports.errorHandler = (error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ message: error.message || 'Internal Server Error' });
  logEmitter.emit('error', error);
  next();
};
