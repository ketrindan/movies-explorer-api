const router = require('express').Router();

const userRouter = require('./users');
const movieRouter = require('./movies');

const { login, createUser } = require('../controllers/users');
const {
  signInValidation,
  signUpValidation,
} = require('../middlewares/validation');
const auth = require('../middlewares/auth');

const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', signInValidation, login);
router.post('/signup', signUpValidation, createUser);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
