const jwt = require('jsonwebtoken');
const { ErrorUnauthorized } = require('../utils/errors');

module.exports.validateToken = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, 'Jason-Statham-defender');
    console.log(payload);
  } catch (err) {
    return next(new ErrorUnauthorized('Authorization required'));
  }

  req.user = payload;

  return next();
};
