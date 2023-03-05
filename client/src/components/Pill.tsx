import React from 'react'

interface PillProps {
    content: string;
    children?: any;
    onClick: any;
    active?: boolean;
}

export const Pill: React.FC<PillProps> = ({ children, content, onClick, active }) => {
    return (
        <div className={`px-4 transition-all duration-500 py-2 w-max shadow-md rounded-full hover:cursor-pointer ${active ? 'bg-black text-white' : 'bg-white text-black'}`} onClick={onClick}>
            {content}
        </div>
    );
}