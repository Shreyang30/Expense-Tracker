import React from 'react';

interface ButtonProps{
    text?: string;
    onClick?: () => void;
    type ?: "button" | "submit" | "reset";
    disabled?: boolean ;
    className ?: string;
}

const Button :React.FC<ButtonProps> =({
    text = "Click me",
    onClick,
    type = "button",    
    disabled = false,
    className ="",
}) => {
    return (
        <div className='flex flex-col justify-center items-center'>
            <button
        onClick={onClick}
        type={type}
        disabled={disabled}
        className={`flex flex-col justify-center items-center text-center text-white bg-black m-10 px-4 py-2 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-orange-400 border w-1/3 rounded-xl ${className}`}>
            {text}
        </button>
        </div>
        
    )
}

export default Button