import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
    const [selectedId, setSelectedId] = useState(0);
    let usersPerPage = 4;
    let renderedPage = selectedId * usersPerPage;
    const paginated = currentMovies.slice(renderedPage, renderedPage + usersPerPage);
    let pageCount = Math.round(currentMovies.length / usersPerPage);
    let elements: JSX.Element[] = [];
    function displayPageNumbers() {
        for (let index = 0; index < pageCount; index++) {

            elements.push(<span>{index + 1}</span>)
        }
        return elements
    }

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
        <div className='min-h-full'>
            <Navbar setIsLoading={setIsLoading} setSearch={setSearch} handleSearch={handleSearch} search={search} movies={movies} setCurrentMovies={setCurrentMovies} setPickedGenre={setPickedGenre} pickedGenre={pickedGenre} />
            {
                isLoading ?
                    <div className='flex justify-center'>
                        <span className='loader mt-10  mx-auto '></span>
                    </div>
                    : (
                        currentMovies.length > 0 ?

                            <div className='flex items-center flex-col space-y-10'>
                                <div className='mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
                                    {
                                        paginated && paginated.map(({ _id: id, title, genre, preview }, key) => {
                                            return (
                                                <Link to={`/${id}`} key={id}>
                                                    <Card title={title} genre={genre} preview={preview} />
                                                </Link>
                                            )
                                        })
                                    }

                                </div>
                                <div className='page_count'>
                                    <button className={`prev `} disabled={selectedId === 0} onClick={() => setSelectedId(selectedId - 1)}>
                                        <div className={`${selectedId === 0 ? "disabled" : ""}`}></div>
                                        <div className={`${selectedId === 0 ? "disabled" : ""}`}></div>
                                    </button>
                                    {displayPageNumbers().map((el, id) => {
                                        return (

                                            <span onClick={() => {
                                                setSelectedId(elements.indexOf(el))
                                            }} key={elements.indexOf(el)} className={`${elements.indexOf(el) === selectedId ? 'selectedPage' : ''} hover:cursor-pointer text-gray-400 font-bold`} style={{ marginLeft: '20px' }}>
                                                {el}
                                            </span>
                                        )
                                    }
                                    )
                                    }

                                    <button className={`next `} disabled={selectedId + 1 === pageCount} onClick={() => setSelectedId(selectedId + 1)}>
                                        <div className={`${selectedId + 1 === pageCount ? 'disabled' : ""}`}></div>
                                        <div className={`${selectedId + 1 === pageCount ? 'disabled' : ""}`}></div>


                                    </button>
                                </div>

                            </div>
                            : (
                                <div>No Match</div>
                            )
                    )
            }
        </div>
    );
}