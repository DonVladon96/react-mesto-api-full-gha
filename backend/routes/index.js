const router = require('express').Router();
const { validateToken } = require('../middlewares/auth');
const { loginValidate, signupValidate } = require('../middlewares/celebrate');
const { login, createUser } = require('../controllers/users');
const routerUser = require('./users');
const cardRouter = require('./cards');
const { NotFoundError404 } = require('../utils/errors');

router.post('/signin', loginValidate, login);
router.post('/signup', signupValidate, createUser);
router.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Exit' });
});

router.use('/users', validateToken, routerUser);
router.use('/cards', validateToken, cardRouter);
router.use('/*', validateToken, (req, res, next) => next(new NotFoundError404('This page not found')));

module.exports = router;
