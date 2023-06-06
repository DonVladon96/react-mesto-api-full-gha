const { HTTP_STATUS_NOT_FOUND } = require('../constants');

class NotFoundError404 extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_NOT_FOUND;
  }
}

module.exports = NotFoundError404;
