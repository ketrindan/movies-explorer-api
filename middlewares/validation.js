const { celebrate, Joi } = require('celebrate');

const signInValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const signUpValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const updateUserProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(/^https?:\/\/(www)?[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]+#?$/),
    trailerLink: Joi.string().required().pattern(/^https?:\/\/(www)?[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]+#?$/),
    thumbnail: Joi.string().required().pattern(/^https?:\/\/(www)?[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]+#?$/),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const getMovieIdValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
});

module.exports = {
  signInValidation,
  signUpValidation,
  updateUserProfileValidation,
  createMovieValidation,
  getMovieIdValidation,
};
