import React from 'react';

interface InputBoxProps{
    label?: string;
    name?: string;
    type?: string;
    placeholder?: string;
    value?:string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const InputBox: React.FC<InputBoxProps> = ({
    label,
    name,
    type= "text",
    placeholder= "",
    onChange,
    className= ""
}) =>{
return (
  <div className="flex flex-col gap-2 justify-center items-center ">
    {label && <label className="text-sm font-medium text-gray-200 ">{label}</label>}
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      className={`border border-gray-300 w-1/3 rounded-xl px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 hover:border-gray-400 ${className}`}
    />
  </div>
);

};

export default InputBox;