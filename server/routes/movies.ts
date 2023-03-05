import express from 'express'
import { addMovie, getMovieById, getMovies, searchMovie } from '../controllers/movies';

const router = express.Router();

router.get('/movies',getMovies)
router.post('/movies',addMovie)
router.post('/movies/filter',searchMovie)
router.get('/movies/:id',getMovieById)

export default router;