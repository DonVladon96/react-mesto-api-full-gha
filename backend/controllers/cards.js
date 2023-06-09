const http2 = require('http2');
const Card = require('../models/card');
const { NotFoundError404, ForbiddenError, BadRequestError } = require('../utils/errors');
const {Error} = require("mongoose");

const {
  HTTP_STATUS_CREATED,
  HTTP_STATUS_OK,
} = http2.constants;

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { _id } = req.user;
  const { name, link } = req.body;

  Card.create({ name, link, owner: _id })
    .then((card) => res.status(HTTP_STATUS_CREATED).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Created card data is not validity!'));
      }

      return next(err);
    });
};

module.exports.cardDelete = (req, res, next) => {
  const { cardId } = req.params;
  return Card.findById(cardId)
    .orFail(new NotFoundError404(`Card Id: ${cardId} is not found`))
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        Card.deleteOne({ _id: cardId })
          .then(res.status(HTTP_STATUS_OK).send(card))
          .catch(next);
      } else {
        throw (new ForbiddenError('You can`t delete card'));
      }
    })
    .catch((err) => {
      if (err instanceof Error.CastError) {
        next(new BadRequestError('Были введены некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .populate(['owner', 'likes'])
    .orFail(() => {
      throw new NotFoundError404(`Card Id: ${cardId} is not found`);
    })
    .then((card) => {
      res.status(HTTP_STATUS_OK).send(card);
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .populate(['owner', 'likes'])
    .orFail(() => {
      throw new NotFoundError404(`Card Id: ${cardId} is not found`);
    })
    .then((card) => {
      res.status(HTTP_STATUS_OK).send(card);
    })
    .catch(next);
};
