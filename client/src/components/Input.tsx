import React from "react";
import { UseFormRegister, FieldError } from "react-hook-form";

interface InputProps {
  register: UseFormRegister<any>;
  name: string;
  label: string;
  type?: string;
  validation?: any;
  error?: FieldError;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  register,
  name,
  label,
  type = "text",
  validation,
  error,
  className = "",
}) => {
  return (
    <div className={`flex flex-col my-2  ${className}`}>
      <label className="block w-full border-2 border-gray-400 focus-within:ring-1 ring-black rounded-lg duration-200 py-1 px-3">
        <div className="text-gray-500 text-sm">
          <span>{label}</span>
          {validation?.required && <span className="text-red-400">*</span>}
        </div>
        <div>
          <input
            type={type}
            {...register(name, validation)}
            className="w-full focus:outline-none bg-transparent"
          />
        </div>
      </label>
      {error instanceof Object && (
        <p className="error">{error.message}</p>
      )}
    </div>
  );
};

export default Input;
