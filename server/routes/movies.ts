import express from 'express'
import { addMovie, getMovies, searchMovie } from '../controllers/movies';

const router = express.Router();

router.get('/movies',getMovies)
router.post('/movies',addMovie)
router.get('/movies/filter',searchMovie)

export default router;