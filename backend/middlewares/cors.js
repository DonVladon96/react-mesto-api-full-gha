const allowedCors = [
  'http://localhost:3000',
  'http://localhost:3001',
  'localhost:3000',
  'https://donvladon.nomoredomains.rocks',
  'http://donvladon.nomoredomains.rocks',
  'https://api.donvladon.nomoredomains.rocks/',
  'http://api.donvladon.nomoredomains.rocks/,',
];

const cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }

  return next();
};

module.exports = cors;
