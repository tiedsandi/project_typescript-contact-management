import type { ButtonHTMLAttributes, ReactNode } from "react";

import { Link } from "react-router";

type Variant = "primary" | "secondary" | "danger";

type BaseProps = {
  children: ReactNode;
  to?: string;
  variant?: Variant;
  fullWidth?: boolean;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  to,
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  ...rest
}: BaseProps) {
  const baseClass =
    "px-4 py-2 text-white rounded-lg transition-all duration-200 font-medium shadow-md cursor-pointer focus:outline-none";
  // "px-4 py-2 text-white rounded-lg transition-all duration-200 font-medium shadow-md cursor-pointer flex items-center focus:outline-none";
  const widthClass = fullWidth ? "w-full" : "";

  const variantClass = {
    primary:
      "bg-gradient hover:opacity-90 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transform hover:-translate-y-0.5",
    secondary:
      "bg-gray-700 hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800",
    danger:
      "bg-gradient-to-r from-red-600 to-red-500 hover:opacity-90 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800",
  }[variant];

  const finalClass = `${baseClass} ${variantClass} ${widthClass} ${className}`;

  // Kalau ada "to", maka render <Link>
  if (to) {
    return (
      <Link to={to} className={finalClass}>
        {children}
      </Link>
    );
  }

  // Kalau tidak ada "to", maka render <button>
  return (
    <button className={finalClass} {...rest}>
      {children}
    </button>
  );
}
