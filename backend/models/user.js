const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcrypt');
const validator = require('validator');
const { REGEX_URL } = require('../utils/constants');
const ErrorUnauthorized = require('../utils/errors/Unauthorized-error-401');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      minlength: 2,
      maxlength: 30,
    },
    about: {
      type: String,
      default: 'Исследователь',
      minlength: 2,
      maxlength: 30,
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (url) => REGEX_URL.test(url),
        message: 'Некорректный URL адрес.',
      },
    },
    email: {
      type: String,
      required: [true, 'Поле email обязательно к заполнению.'],
      unique: [true, 'Данный email уже используется.'],
      validate: {
        validator: (email) => validator.isEmail(email),
        message: 'Некорректный URL адрес.',
      },
    },
    password: {
      type: String,
      required: [true, 'Поле password обязательно к заполнению.'],
      select: false,
    },
  },
  {
    versionKey: false,
  },
);

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new ErrorUnauthorized('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new ErrorUnauthorized('Неправильные почта или пароль');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
