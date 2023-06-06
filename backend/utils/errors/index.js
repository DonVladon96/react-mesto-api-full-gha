const NotFoundError404 = require('./Not-found-error-404');
const ErrorUnauthorized = require('./Unauthorized-error-401');
const ForbiddenError = require('./Forbidden-error-403');
const BadRequestError = require('./BadRequest-Error-400');
const ConflictError = require('./Conflict-error-409');

module.exports = {
  NotFoundError404,
  ErrorUnauthorized,
  ForbiddenError,
  BadRequestError,
  ConflictError,
};
