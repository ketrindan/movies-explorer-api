const userRouter = require('express').Router();
const {
  updateUserProfile, getCurrentUser,
} = require('../controllers/users');

const { updateUserProfileValidation } = require('../middlewares/validation');

userRouter.get('/me', getCurrentUser);

userRouter.patch('/me', updateUserProfileValidation, updateUserProfile);

module.exports = userRouter;
