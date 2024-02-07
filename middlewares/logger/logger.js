const EventEmitter = require('events');
// eslint-disable-next-line import/no-extraneous-dependencies
const { createLogger, transports, format } = require('winston');

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`),
  ),
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.Console({ level: 'info' }),
  ],
  exitOnError: false,
});

const logEmitter = new EventEmitter();
logEmitter.on('error', (error) => {
  logger.error(error.message);
});

module.exports = logEmitter;
