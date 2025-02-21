import React from 'react';

interface InputBoxProps{
    label?: string;
    type?: string;
    placeholder?: string;
    value?:string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const InputBox: React.FC<InputBoxProps> = ({
    label,
    type= "text",
    placeholder= "",
    value,
    onChange,
    className= ""
}) =>{
    return(
        <div className='flex flex-col gap-2'>
            {label && <label className='text-sm font-medium'>{label}</label>}
            <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 ${className}`}
            />
        </div>
    )
};

export default InputBox;