const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');

const cookieParser = require('cookie-parser');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');
const errorMiddlewares = require('./middlewares/errorMiddlewares');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

require('dotenv').config();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb').then(() => {
  console.log('Connected to database.');
}).catch((error) => {
  console.error('Error connecting to database:', error);
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);
app.use(helmet());

app.use(auth);
app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorMiddlewares);
app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`Listing on ${PORT}`);
});
