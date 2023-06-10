const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');

const cors = require('cors');
const routes = require('./routes');
const errorMiddlewares = require('./middlewares/errorMiddlewares');
const auth = require('./middlewares/auth');
const { loginValidate, signupValidate } = require('./middlewares/celebrate');
const { login, createUser } = require('./controllers/users');

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
    throw new Error('Лови его он падает! Кого? Сервер!');
  }, 0);
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);
app.use(helmet());

app.post('/signin', loginValidate, login);
app.post('/signup', signupValidate, createUser);

app.use(auth);
app.use(routes);

app.use(errors());
app.use(errorMiddlewares);

app.listen(PORT, () => {
  console.log(`Listing on ${PORT}`);
});
