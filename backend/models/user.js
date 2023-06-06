const mongoose = require('mongoose');
const validator = require('validator');
const { expression } = require('../utils/constants');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Жак-Ивень Кустов',
      minlength: [2, 'Минимальная длинна поля - 2 символа.'],
      maxlength: [30, 'Максимальная длинна поля - 30 символов.'],
    },
    about: {
      type: String,
      default: 'исследователь',
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

module.exports = mongoose.model('user', userSchema);
