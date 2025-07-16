import React from "react";

type Props = {
  height?: string;
  size?: number;
  children?: React.ReactNode;
};

const LoadingScreen = ({ height = "60vh", size = 48, children }: Props) => (
  <div
    className="w-full flex flex-col justify-center items-center"
    style={{ height }}
  >
    <div
      className="border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"
      style={{ width: size, height: size }}
    ></div>
    {children && (
      <p className="mt-4 text-white text-center text-sm opacity-80">
        {children}
      </p>
    )}
  </div>
);

export default LoadingScreen;
