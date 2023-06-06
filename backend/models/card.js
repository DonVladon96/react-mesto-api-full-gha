const mongoose = require('mongoose');
const { expression } = require('../utils/constants');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Поле name обязательно к заполнению.'],
      minlength: [2, 'Минимальная длинна поля - 2 символа.'],
      maxlength: [30, 'Максимальная длинна поля - 30 символов.'],
    },
    link: {
      type: String,
      required: [true, 'Поле name обязательно к заполнению.'],
      validate: {
        validator: (url) => expression.test(url),
        message: 'Url is not validity',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Поле name обязательно к заполнению.'],
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
    createdAt: {
      type: Date,
      default: new Date(),
      required: true,
    },
  },
);

module.exports = mongoose.model('card', cardSchema);
