import { useState, type ComponentPropsWithoutRef, type ReactNode } from "react";

type InputProps = {
  label?: string;
  icon?: ReactNode;
  type?: "text" | "number" | "password" | "email";
  name?: string;
  placeholder?: string;
} & ComponentPropsWithoutRef<"input">;

export default function Input({
  label,
  icon,
  name,
  type = "text",
  placeholder,
  required,
  ...rest
}: InputProps) {
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
          id={id}
          name={name}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          required={required}
          {...rest}
          className={`w-full ${icon ? "pl-10" : "pl-3"} ${
            isPassword ? "pr-10" : "pr-3"
          } py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
        />

        {/* toggle show */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
            tabIndex={-1}
          >
            <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`} />
          </button>
        )}
      </div>
    </div>
  );
}
