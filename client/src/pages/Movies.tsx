import React, { useState, useEffect } from 'react'
import { Card } from '../components/Card';
import { Navbar } from '../components/Navbar';
import axiosInstance from '../services/axios';
import { endpoints } from '../services/endpoints';
import { MoviesType } from '../utils/types';
interface MoviesProps {

}


export const Movies: React.FC<MoviesProps> = ({ }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [movies, setMovies] = useState<Array<MoviesType>>([]);
    const [currentMovies, setCurrentMovies] = useState<Array<MoviesType>>([]);
    const [pickedGenre, setPickedGenre] = useState<Array<string>>([]);
    const [search, setSearch] = useState<string>("");

    async function fetchMovies() {
        const response = await axiosInstance.get(endpoints.movies);
        setMovies(response.data);
        setCurrentMovies(response.data);
        setIsLoading(false);
    }

    const handleSearch = async () => {
        const response = await axiosInstance.post(endpoints.search,
            {
                "title": search,
                "genre": pickedGenre
            });

        setCurrentMovies(response.data)
        setIsLoading(false)

    }

    useEffect(() => {
        if (pickedGenre.length === 0) {
            fetchMovies()
        } else {
            handleSearch()
        }
    }, [pickedGenre])


    return (
        <header>
            <Navbar setIsLoading={setIsLoading} setSearch={setSearch} handleSearch={handleSearch} search={search} movies={movies} setCurrentMovies={setCurrentMovies} setPickedGenre={setPickedGenre} pickedGenre={pickedGenre} />
            {
                isLoading ?
                    <div className='flex justify-center'>
                        <span className='loader mt-10  mx-auto '></span>
                    </div>
                    : (
                        currentMovies.length > 0 ?
                            <div className='mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
                                {
                                    currentMovies.map(({ title, genre, preview }, key) => {
                                        return (
                                            <Card key={key} title={title} genre={genre} preview={preview} />
                                        )
                                    })
                                }
                            </div> : (
                                <div>No Match</div>
                            )
                    )
            }
        </header>
    );
}