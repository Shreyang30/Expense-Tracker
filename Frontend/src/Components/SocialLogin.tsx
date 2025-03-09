import React from 'react';
import {FcGoogle}from 'react-icons/fc'

interface SocialOProps{
    onClick() : void;
    text?:string;
    className?: string;
    disabled?: boolean;
}

const SocialLogin: React.FC<SocialOProps> = ({onClick,text,className,disabled}) => {
    return(
        <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-1/5 max-w-xs
        flex items-center justify-center gap-2
        bg-white text-gray-700 font-medium
        px-4 py-2.5 rounded-lg
        border border-gray-200 shadow-sm
        hover:bg-gray-50 hover:shadow-md
        focus:outline-none focus:ring-2 focus:ring-blue-500
        disabled:opacity-60 disabled:cursor-not-allowed
        transition-all duration-200 ease-in-out
        ${className}
      `}
    >
      <FcGoogle className="text-xl flex-shrink-0" />
      <span>{text}</span>
    </button>
    )
}

export default SocialLogin