import { FocusEventHandler, ReactNode, useState } from "react";
import { ChevronDown } from "react-feather";

interface DropdownProps {
  children: React.ReactNode;
  buttonText?: string | ReactNode;
  icon?: ReactNode;
  className?: string;
}

export default function Dropdown({
  children,
  icon,
  className,
  buttonText,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleBlur: FocusEventHandler = () => {
    const myTimeout = setTimeout(() => {
      setIsOpen(false);
    }, 500);
    clearTimeout(myTimeout);
  };

  className="bg-red-50"
  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className={`inline-flex w-full justify-center items-center gap-x-2 bg-white px-3 py-2 text-sm font-semibold
           text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${className}`}
        id="menu-button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => setIsOpen((prev) => !prev)}
        onBlur={handleBlur}
      >
        {icon || <ChevronDown />}
        {buttonText}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-red-400 ring-opacity-10 focus:outline-none">
          <div className="py-1" role="none">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
