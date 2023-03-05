import React from 'react'

interface CardProps {
    title: string,
    genre: string,
    preview: string
}

export const Card: React.FC<CardProps> = ({ title, genre, preview }) => {
    return (
        <div className='relative h-screen max-h-52 rounded-lg overflow-hidden bg-black card hover:cursor-pointer'>

            <img className='brightness-50 w-full h-full object-cover img transition-all duration-700' src={preview} alt="" />
            <div className='absolute top-20 bottom-0 w-full px-5 flex items-center justify-between'>
                <h1 className='font-bold text-lg flex-1'>{title}</h1>
                <div className='w-8 h-8 flex items-center justify-center bg-white rounded-full'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M12 3c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 14c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg></div>
            </div>

        </div>
    );
}