import {
  useState,
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

import clsx from "clsx";

type InputProps = {
  label?: string;
  icon?: ReactNode;
  type?: "text" | "number" | "password" | "email";
  name?: string;
  disabled?: boolean;
  placeholder?: string;
  error?: string;
} & ComponentPropsWithoutRef<"input">;

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      icon,
      name,
      type = "text",
      placeholder,
      required,
      disabled,
      error,
      ...rest
    },
    ref
  ) => {
    const id = rest.id ?? name;
    const isPassword = type === "password";
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="mb-4">
        {label && (
          <label
            htmlFor={id}
            className="block text-gray-300 text-sm font-medium mb-2"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {/* icon */}
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {icon}
            </div>
          )}

          {/* input */}
          <input
            ref={ref}
            id={id}
            name={name}
            type={isPassword ? (showPassword ? "text" : "password") : type}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            {...rest}
            className={clsx(
              "w-full",
              icon ? "pl-10" : "pl-3",
              isPassword ? "pr-10" : "pr-3",
              "py-3 bg-gray-700 bg-opacity-50 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200",
              {
                "border-red-500 focus:ring-red-500": error,
                "border-gray-600 focus:ring-blue-500": !error,
                "text-gray-400 cursor-not-allowed ": disabled,
                "text-white": !disabled,
              }
            )}
          />

          {/* toggle show */}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
              tabIndex={-1}
            >
              <i
                className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
              />
            </button>
          )}
        </div>

        {/* error */}
        {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
