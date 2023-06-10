const { celebrate, Joi } = require('celebrate');
const { REGEX_URL } = require('../utils/constants');

const cardJoiIdTemplate = { cardId: Joi.string().length(24).hex().required() };

const validateID = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
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
    avatar: Joi.string().required().regex(REGEX_URL),
  }),
});

const loginValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const signupValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(REGEX_URL),
  }),
});

const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(REGEX_URL),
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
