const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { expression } = require('../utils/constants');
const ErrorUnauthorized = require('../utils/errors/Unauthorized-error-401');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Don Vladon',
      minlength: [2, 'Минимальная длинна поля - 2 символа.'],
      maxlength: [30, 'Максимальная длинна поля - 30 символов.'],
    },
    about: {
      type: String,
      default: 'web-developer',
      minlength: [2, 'Минимальная длинна поля - 2 символа.'],
      maxlength: [30, 'Максимальная длинна поля - 30 символов.'],
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (url) => expression.test(url),
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
);

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
