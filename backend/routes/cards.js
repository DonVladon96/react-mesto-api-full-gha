const cardRouter = require('express').Router();
const {
  validateCreateCard, validateDeleteCard, validateLikeCards, validateDislikeCards,
} = require('../middlewares/celebrate');
const {
  getCards, createCard, cardDelete, likeCard, dislikeCard,
} = require('../controllers/cards');

cardRouter.get('/', getCards);
cardRouter.post('/', validateCreateCard, createCard);
cardRouter.delete('/:cardId', validateDeleteCard, cardDelete);
cardRouter.put('/:cardId/likes', validateLikeCards, likeCard);
cardRouter.delete('/:cardId/likes', validateDislikeCards, dislikeCard);

module.exports = cardRouter;
