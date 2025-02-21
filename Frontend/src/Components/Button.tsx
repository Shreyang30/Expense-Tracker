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
        <button
        onClick={onClick}
        type={type}
        disabled={disabled}
        className={`text-center text-white bg-black px-4 py-2 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 border rounded-xl ${className}`}>
            {text}
        </button>
    )
}

export default Button