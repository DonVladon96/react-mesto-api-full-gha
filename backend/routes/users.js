const routerUser = require('express').Router();
const { validateID, validateProfileUpdate, validateUpdateAvatar } = require('../middlewares/celebrate');
const {
  getUsers, updateProfile, updateAvatar, getCurrentUser, getUser,
} = require('../controllers/users');

routerUser.get('/', getUsers);
routerUser.get('/me', getCurrentUser);
routerUser.get('/:userId', validateID, getUser);

routerUser.patch('/me', validateProfileUpdate, updateProfile);
routerUser.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = routerUser;
