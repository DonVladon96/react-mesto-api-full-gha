const { HTTP_STATUS_UNAUTHORIZED } = require('../constants');

class ErrorUnauthorized extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_UNAUTHORIZED;
  }
}

module.exports = ErrorUnauthorized;
