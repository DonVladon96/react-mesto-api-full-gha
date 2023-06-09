const router = require('express').Router();

const routerUser = require('./users');
const cardRouter = require('./cards');
const { NotFoundError404 } = require('../utils/errors');

router.use('/users', routerUser);
router.use('/cards', cardRouter);
router.use((req, res, next) => {
  next(new NotFoundError404('Сервер не найден.'));
});

module.exports = router;
