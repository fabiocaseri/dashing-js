var winston = require('winston');

winston.handleExceptions(new winston.transports.File({ filename: 'uncaughtExceptions.log' }));

module.exports = logger = new winston.Logger({
  transports: [
    new winston.transports.Console({timestamp: true})
  ]
});
