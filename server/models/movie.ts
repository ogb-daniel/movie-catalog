import mongoose from "mongoose";

export interface MovieType{
    title:string,
    genre:string,
    description:string,
    preview:string
}

const movieSchema = new mongoose.Schema<MovieType>({
    title:String,
    genre:String,
    description:String,
    preview:String
})

const Movie = mongoose.model("Movie",movieSchema);
export default Movie;