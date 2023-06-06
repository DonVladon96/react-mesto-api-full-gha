const { celebrate, Joi } = require('celebrate');
const { expression } = require('../utils/constants');

const cardJoiIdTemplate = { cardId: Joi.string().length(24).hex().required() };

const validateID = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24).hex(),
  }),
});

const validateProfileUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const validateUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(expression),
  }),
});

const loginValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const signupValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(expression),
  }),
});

const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(expression),
  }),
});

const validateDeleteCard = celebrate({
  params: Joi.object().keys(cardJoiIdTemplate),
});

const validateLikeCards = celebrate({
  params: Joi.object().keys(cardJoiIdTemplate),
});
const validateDislikeCards = celebrate({
  params: Joi.object().keys(cardJoiIdTemplate),
});

module.exports = {
  // eslint-disable-next-line max-len
  loginValidate, validateUpdateAvatar, validateProfileUpdate, validateID, cardJoiIdTemplate, signupValidate, validateCreateCard, validateDeleteCard, validateLikeCards, validateDislikeCards,
};
