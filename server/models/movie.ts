import mongoose from "mongoose";

export interface MovieType{
    title:string,
    genre:string,
    description:string,
    preview:string,
    director:string,
    production:string
}

const movieSchema = new mongoose.Schema<MovieType>({
    title:String,
    genre:String,
    description:String,
    preview:String,
    director:String,
    production:String
})

const Movie = mongoose.model("Movie",movieSchema);
export default Movie;