// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const http2 = require('http2');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const {
  NotFoundError404,
  BadRequestError,
  ConflictError,
} = require('../utils/errors');
// eslint-disable-next-line import/order
const { Error } = require('mongoose');

const {
  HTTP_STATUS_CREATED,
  HTTP_STATUS_OK,
} = http2.constants;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, `${NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'}`, { expiresIn: '7d' });

      res.send({ token });
    })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  console.log('Hello Vald');
  User.find({})
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError404('User is not found');
    })
    .then((user) => {
      res.status(HTTP_STATUS_OK).send(user);
    })
    .catch(next);
};

// вариант из вебинара Сергея Буртылева
module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new NotFoundError404('Пользователь не найден');
    })
    .then((user) => {
      res.status(HTTP_STATUS_OK).send(user);
    })
    .catch((err) => {
      if (err instanceof Error.CastError) {
        next(new BadRequestError('Введены некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then((user) => {
          const NewUserObj = user.toObject();
          delete NewUserObj.password;
          res.status(HTTP_STATUS_CREATED).send(NewUserObj);
        })
        .catch((err) => {
          if (err instanceof Error.ValidationError) {
            next(new BadRequestError('При регистрации были введены некорректные данные'));
          } else if (err.code === 11000) {
            next(new ConflictError('Пользователь уже существует'));
          } else {
            next(err);
          }
        });
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body || {};

  return User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError404('User is not found');
      }
      res.status(HTTP_STATUS_OK).send(user);
    })
    .catch((err) => {
      if (err instanceof Error.CastError || err.name === 'ValidationError') {
        next(new BadRequestError('Введены некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body || {};

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError404('User is not found');
      }
      res.status(HTTP_STATUS_OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('User id is not validity'));
      }

      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError404(`User Id: ${req.user._id} is not found`));
      }

      return next(err);
    });
};
