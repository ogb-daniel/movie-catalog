import {connect,closeDatabase} from './db'

import Movie, {
    MovieType    
  } from "../models/movie";
  import {faker} from "@faker-js/faker";
  describe("personModel Testing", () => {
    beforeAll(async () => {
      await connect();
    });
  
    afterAll(async () => {
      await Movie.collection.drop();
      await closeDatabase();
    });
    test("Movie Create Test",async()=>{
        const movieInput: MovieType = {
            title: faker.word.noun(),
            description: faker.word.noun(),
            genre: faker.word.noun(),
            preview:faker.image.abstract()
        }
        const movie = new Movie({...movieInput});
        const createdMovie = await movie.save();
        expect(createdMovie).toBeDefined();
        expect(createdMovie.title).toBe(movie.title);
        expect(createdMovie.description).toBe(movie.description);
        expect(createdMovie.genre).toBe(movie.genre);
        expect(createdMovie.preview).toBe(movie.preview);
    })

    test("Movie Read Test",async()=>{
        const fetchedMovie = await Movie.find();
        expect(fetchedMovie).toBeDefined();
    })
    
  });