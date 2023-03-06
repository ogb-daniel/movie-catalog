import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../services/axios';
import { endpoints } from '../services/endpoints';
import { MoviesType } from '../utils/types';
interface MovieProps {

}

export const Movie: React.FC<MovieProps> = ({ }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [movie, setMovie] = useState<MoviesType>();
    const { id } = useParams();

    async function fetchMovie() {
        const response = await axiosInstance.get(endpoints.movies + "/" + `${id}`)
        setMovie(response.data);
        setIsLoading(false);
    }
    useEffect(() => {
        fetchMovie();
    }, [])


    return (
        <div className='w-full max-w-7xl mx-auto text-center h-full min-h-screen'>
            {
                isLoading ?
                    <span className='loader'></span>
                    :
                    <div>
                        <div className='my-6 flex justify-center'>
                            <img className='w-1/5 hover:scale-150 transition-all' src={movie?.preview} alt="" />
                        </div>
                        <div className='flex justify-between'>
                            <div>
                                <p className='text-gray-400'>Director</p>
                                <h1 className='font-bold text-2xl'>{movie?.director}</h1>
                            </div>
                            <div>
                                <p className='text-gray-400'>Genre</p>
                                <div className='flex space-x-2'>{movie?.genre.split("|").map((gen) => (<h1 className='font-bold text-2xl'>{gen}</h1>))}</div>
                            </div>
                        </div>
                        <div className='flex items-center justify-center flex-col space-y-3'>
                            <h1 className='font-bold text-3xl'>{movie?.title}</h1>
                            <p className='font-semibold text-lg'>By: {movie?.production}</p>
                            <a href={`https://www.youtube.com/results?search_query=${movie?.title}`} target="_blank" className='flex items-center px-4 py-2 hover:cursor-pointer hover:shadow-2xl hover:bg-orange-400 rounded-md transition-all'> <svg className='mr-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z" fill="rgba(255,255,255,1)" /></svg> Watch Trailer </a>
                        </div>
                        <div className='text-lg mt-4 text-left'>
                            <p className='font-semibold'>Synopsis:</p>
                            <p>{movie?.description}</p>
                        </div>
                    </div>
            }
        </div>
    );
}