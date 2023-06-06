const routerUser = require('express').Router();
const { validateID, validateProfileUpdate, validateUpdateAvatar } = require('../middlewares/celebrate');
const {
  getUsers, getUserById, updateProfile, updateAvatar,
} = require('../controllers/users');

routerUser.get('/', getUsers);
routerUser.get('/me', getUserById);
routerUser.get('/:id', validateID, getUserById);

routerUser.patch('/me', validateProfileUpdate, updateProfile);
routerUser.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = routerUser;
