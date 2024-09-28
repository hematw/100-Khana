// Input.tsx
import React from "react";
import { UseFormRegister, FieldValues, FieldError } from "react-hook-form";

interface InputProps {
  register: UseFormRegister<FieldValues>;
  name: string;
  label: string;
  type?: string;
  validation?: any;
  error?: FieldError;
}

const Input: React.FC<InputProps> = ({
  register,
  name,
  label,
  type = "text",
  validation,
  error,
}) => {
  return (
    <div className="flex flex-col mb-4">
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

      {/* <label className="text-gray-500 text-sm">
        {label}
        {validation?.required && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type}
        {...register(name, validation)}
        className="border-2 border-gray-400 rounded-lg py-1 px-3 focus:outline-none bg-transparent"
      /> */}
      {error && <p className="text-red-400 text-sm">{error.message}</p>}
    </div>
  );
};

export default Input;
