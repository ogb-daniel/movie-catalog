import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Pill } from '../components/Pill';
import axiosInstance from '../services/axios';
import { endpoints } from '../services/endpoints';
import { genres } from '../utils/genre';
import { MoviesType } from '../utils/types';

interface AddMovieProps {

}



export const AddMovie: React.FC<AddMovieProps> = ({ }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pickedGenre, setPickedGenre] = useState<Array<string>>([]);
    const [error, setError] = useState<{ prop: string, error: string }>();
    const navigate = useNavigate()
    const [movie, setMovie] = useState<MoviesType>({
        title: "",
        director: "",
        production: "",
        preview: "",
        description: "",
        genre: "",
    });

    async function addMovie() {
        const response = await axiosInstance.post(endpoints.movies,
            movie
        );
        console.log(response.data);

    }

    const handleAdd = (e: any) => {
        e.preventDefault();
        setIsLoading(true)
        if (/data:image\/[^;]+;base64[^"]+/.test(movie.preview) === false && /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/.test(movie.preview) === false) {
            setError({ prop: "preview", error: "Enter a valid image url" })
            return;
        }
        addMovie()
        navigate("/")

    }

    return (
        <section className="text-white body-font relative">
            <div className="container px-5 py-24 mx-auto">
                <h1 onClick={() => {
                    navigate(-1)
                }} className='flex items-center hover:cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 9V8l-4 4 4 4v-3h4v-2h-4z" fill="rgba(255,255,255,1)" /></svg>Go back</h1>
                <div className="flex flex-col text-center w-full mb-12">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4">Add Movie</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Add a movie of your choice to the catalog</p>
                </div>
                <div className="lg:w-1/2 md:w-2/3 mx-auto">
                    <form className="flex flex-wrap -m-2" onSubmit={handleAdd}>
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label className="leading-7 text-sm ">Title</label>
                                <input required type="text" onChange={(e) => {
                                    setMovie({ ...movie, title: e.target.value })
                                }} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                        </div>
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label className="leading-7 text-sm ">director</label>
                                <input required type="text" onChange={(e) => {
                                    setMovie({ ...movie, director: e.target.value })
                                }} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                        </div>
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label className="leading-7 text-sm ">production</label>
                                <input required type="text" onChange={(e) => {
                                    setMovie({ ...movie, production: e.target.value })
                                }} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                        </div>
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label className="leading-7 text-sm ">Preview Image(Url)</label>
                                <input required type="text" onChange={(e) => {
                                    setError({ prop: "", error: "" });
                                    setMovie({ ...movie, preview: e.target.value })
                                }} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                {
                                    error && error!.prop === "preview" && <p className='text-red-500'>{error.error}</p>
                                }
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <div className="relative">
                                <label className="leading-7 text-sm ">Description</label>
                                <textarea required onChange={(e) => {
                                    setMovie({ ...movie, description: e.target.value })
                                }} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <div className='mt-3 flex-col '>
                                <p className='text-white mr-3 font-semibold text-center '>Genre: </p>
                                <div className='gridContainer md:mt-0 text-black flex-none transition-all'>

                                    {genres.map((genre, key) => (
                                        <Pill key={genre} active={pickedGenre?.includes(genre)} content={genre} onClick={() => {
                                            if (pickedGenre?.includes(genre)) {
                                                setPickedGenre(pickedGenre.filter(gen => gen !== genre))
                                                setMovie({ ...movie, genre: movie.genre.replace(genre + "|", "") })
                                            } else {

                                                setPickedGenre([...pickedGenre, genre])
                                                setMovie({ ...movie, genre: movie.genre.concat(genre + "|") })
                                            }
                                        }} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="p-2 w-full">
                            {
                                isLoading ? <span className='loader'></span> :
                                    <button type="submit" className="flex mx-auto text-white flix border-0 py-2 px-8 focus:outline-none hover:bg-orange-400 hover:text-white transition-all duration-500 rounded text-lg">Create</button>
                            }
                        </div>

                    </form>
                </div>
            </div>
        </section>
    );
}