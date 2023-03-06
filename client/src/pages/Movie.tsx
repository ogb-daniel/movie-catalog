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
    }
    useEffect(() => {
        fetchMovie();
        setIsLoading(false);
    }, [])


    return (
        <div className='w-full max-w-7xl mx-auto text-center h-screen'>
            {
                isLoading ?
                    <span className='loader'></span>
                    :
                    <div className='h-full'>
                        <div className=' h-1/2'>
                            <img className='w-full h-full object-contain ' src={movie?.preview} alt="" />

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
                        <div className='flex justify-center flex-col space-y-3'>
                            <h1 className='font-bold text-3xl'>{movie?.title}</h1>
                            <span className='font-semibold text-lg'>By: {movie?.production}</span>
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