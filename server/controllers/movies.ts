import {Request,Response}  from 'express';
import mongoose from "mongoose";    
import Movie from "../models/movie";

export const getMovies =async(req:Request,res:Response)=>{
    try {
        
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (error:any) {
        res.status(404).json({message:error.message})
    }
}

export const addMovie = async(req:Request,res:Response)=>{
    const movie = req.body;
    const newMovie = new Movie(movie)
    try {
        await newMovie.save();
        res.status(201).json(newMovie)
    } catch (error:any) {
        res.status(409).json({message:error.message})
    }
}

export const getMovieById = async(req:Request,res:Response)=>{
    const {movieId:_id} = req.params;
    try {
        const movie = await Movie.findById(_id);
        res.status(200).json(movie)
    } catch (error:any) {
        res.status(404).json({message:error.message})        
    }
}

export const searchMovie = async(req:Request,res:Response)=>{
    
    const {title,genre} = req.body;
    try{
    let movies:any = await Movie.find();
    if(genre){
        var moviesByGenre:any = [];
        movies.filter((movie:any)=>{
            genre.forEach((gen:any)=>{
                if( movie.genre?.includes(gen) || movie.genre?.toLowerCase().includes(gen) || movie.genre?.toUpperCase().includes(gen) ){
                moviesByGenre.push(movie)
                }
            })
        })
    }

    if(title){
        if(genre){
            var moviesBySearch =  moviesByGenre.filter((movie:any)=>{
                if(movie.title?.includes(title) || movie.title?.toLowerCase().includes(title) || movie.title?.toUpperCase().includes(title)){
                    return movie
                }
            })
        }else{
            var moviesBySearch =  movies.filter((movie:any)=>{
                if(movie.title?.includes(title) || movie.title?.toLowerCase().includes(title) || movie.title?.toUpperCase().includes(title)){
                    return movie
                }
            })
        }
        res.status(200).json(moviesBySearch)
    }else{
        res.status(200).json(moviesByGenre)
    }
 
}catch(error:any){
    res.status(404).json({message:error.message})
}



}