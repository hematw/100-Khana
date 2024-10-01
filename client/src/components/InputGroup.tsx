import React from "react";

interface InputGroupProps {
  label: string;
  text: string;
  children: React.ReactNode;
  className?: string;
}

const InputGroup: React.FC<InputGroupProps> = ({
  label,
  text,
  children,
  className,
}) => {
  return (
    <div className={`border-b border-gray-300 py-6 ${className}`}>
      <p className="font-medium">{label}</p>
      <p className="text-sm mt-4">{text}</p>
      {children}
    </div>
  );
};

export default InputGroup;
