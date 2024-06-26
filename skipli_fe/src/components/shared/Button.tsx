import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, disabled, type = "button", ...props }, ref) => {
    return (
      <button
        type={type}
        className={twMerge(
          "w-full rounded-lg bg-blue-300 border border-transparent px-3 py-3 disabled:cursor-not-allowed disabled:opacity-50 text-gray-600 font-medium transition duration-300 ease-in-out transform hover:bg-blue-400 hover:text-white hover:shadow-lg active:scale-95",
          className,
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
