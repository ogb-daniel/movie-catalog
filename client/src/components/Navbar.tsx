import React, { useEffect, useMemo, useState } from 'react'
import axiosInstance from '../services/axios';
import { endpoints } from '../services/endpoints';
import { genres } from '../utils/genre';
import { MoviesType } from '../utils/types';
import { Pill } from './Pill';
import { useNavigate, Link } from 'react-router-dom';

interface NavbarProps {
    movies: Array<MoviesType>,
    setCurrentMovies: React.Dispatch<React.SetStateAction<MoviesType[]>>,
    setPickedGenre: React.Dispatch<React.SetStateAction<string[]>>,
    pickedGenre: Array<string>,
    search: string,
    handleSearch: any,
    setSearch: React.Dispatch<React.SetStateAction<string>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const Navbar: React.FC<NavbarProps> = ({ setIsLoading, movies, setCurrentMovies, setPickedGenre, pickedGenre, search, handleSearch, setSearch }) => {
    const [showMore, setShowMore] = useState<boolean>(false);
    const [genreCount, setGenreCount] = useState(6);
    const navigate = useNavigate();


    const handleAddMovie = () => {
        navigate('/addMovie')
    }
    return (
        <div className=' flex flex-col lg:flex-row lg:justify-between items-center  lg:items-start'>
            <Link to={"/"}>

                <h1 className='text-2xl font-bold'>Mo<span className='flix'>Flix</span></h1>
            </Link>
            <div className=' flex shadow-md rounded-md search px-4 py-2 text-center w-max text-black' >
                <input value={search} onKeyDown={(e) => {
                    if (search) {
                        if (e.key === "Backspace") {

                            setCurrentMovies(movies);
                        }
                    }
                }} onChange={(e) => {
                    setSearch(e.target.value);
                }} className='outline-none w-full search text-white' placeholder='Search' type="search" />
                <span onClick={() => {
                    if (search) {
                        handleSearch()
                    }
                }} className='hover:cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M11 2c4.968 0 9 4.032 9 9s-4.032 9-9 9-9-4.032-9-9 4.032-9 9-9zm0 16c3.867 0 7-3.133 7-7 0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7zm8.485.071l2.829 2.828-1.415 1.415-2.828-2.829 1.414-1.414z" fill="rgba(255,255,255,1)" /></svg></span>


            </div>

            <div className='flex space-x-2'>
                <div className='gridContainer mt-4 md:mt-0 text-black flex-none transition-all'>
                    {
                        genres.slice(0, genreCount).map((genre: string) => {
                            return (
                                <Pill key={genre} active={pickedGenre?.includes(genre)} content={genre} onClick={() => {
                                    setIsLoading(true)
                                    if (pickedGenre?.includes(genre)) {
                                        setPickedGenre(pickedGenre.filter(gen => gen !== genre))
                                    } else {

                                        setPickedGenre([...pickedGenre, genre])
                                    }
                                }} />
                            )
                        })
                    }
                </div>

                <div className=' hover:cursor-pointer' onClick={(e) => {
                    e.stopPropagation()
                    setShowMore(!showMore)
                    if (showMore) {
                        setGenreCount(100)
                    } else {
                        setGenreCount(6)

                    }
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm4.5-14.5L10 10l-2.5 6.5L14 14l2.5-6.5zM12 13a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" fill="rgba(255,255,255,1)" /></svg>
                </div>
            </div>
            <div className='flex items-center font-bold text-lg hover:cursor-pointer' onClick={handleAddMovie}>Add Movie
                <svg className='ml-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" fill="rgba(255,255,255,1)" /></svg>
            </div>
        </div>

    );
}