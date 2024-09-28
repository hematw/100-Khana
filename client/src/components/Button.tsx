import React from "react";

interface ButtonProps {
  className?: string;
  type: "dark" | "gradient" | "simple";
  children: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
}

const buttonStyles = {
  simple: "bg-white text-black underline p-0",
  dark: "bg-black",
  gradient: "bg-gradient hover:bg-gradient-b",
};

export default function Button({
  className,
  type,
  children,
  onClick,
  icon,
  disabled,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      type="submit"
      onClick={onClick}
      className={`inline-flex hover:opacity-80 place-content-center gap-2 duration-150 text-white py-2 px-4 min-w-32 text-lg mt-4 rounded-lg ${className} ${buttonStyles[type]}`}
    >
      {icon ? icon : ""}
      {children}
    </button>
  );
}
