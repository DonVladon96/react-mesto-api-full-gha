const http2 = require('http2');
const Card = require('../models/card');
const { NotFoundError404, ForbiddenError, BadRequestError } = require('../utils/errors');

const {
  HTTP_STATUS_CREATED,
  HTTP_STATUS_OK,
} = http2.constants;

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  console.log(req.user);
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
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
  Card.findById(cardId)
    .orFail(new NotFoundError404(`Card Id: ${cardId} is not found`))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw (new ForbiddenError('You can`t delete card'));
      }

      return card;
    })
    .then((card) => Card.deleteOne(card))
    .then(() => res.status(HTTP_STATUS_OK).send({ message: 'Card delete successful' }))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFoundError404(`Card Id: ${req.params.cardId} is not founded`));
      }

      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Like data is not founded'));
      }

      return next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFoundError404(`Card Id: ${req.params.cardId} is not found`));
      }

      return res.status(HTTP_STATUS_OK)
        .send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return next(new BadRequestError('Like data is not founded'));
      }

      return next(err);
    });
};
