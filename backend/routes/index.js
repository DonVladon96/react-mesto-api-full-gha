const router = require('express').Router();
const { loginValidate, signupValidate } = require('../middlewares/celebrate');
const { login, createUser } = require('../controllers/users');
const routerUser = require('./users');
const cardRouter = require('./cards');
const { NotFoundError404 } = require('../utils/errors');

router.post('/signin', loginValidate, login);
router.post('/signup', signupValidate, createUser);

router.use('/users', routerUser);
router.use('/cards', cardRouter);
router.use((req, res, next) => next(new NotFoundError404('This page not found')));

module.exports = router;
