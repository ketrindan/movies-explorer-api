const movieRouter = require('express').Router();
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

const {
  createMovieValidation,
  getMovieIdValidation,
} = require('../middlewares/validation');

movieRouter.get('/', getMovies);

movieRouter.post('/', createMovieValidation, createMovie);

movieRouter.delete('/:id', getMovieIdValidation, deleteMovie);

module.exports = movieRouter;
