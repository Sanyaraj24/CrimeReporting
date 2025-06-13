// components/Spinner.tsx
import React from "react";

const Spinner = () => {
  return (
    <>
      <div className="flex items-center justify-center h-screen w-full">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-red-500 animate-ping"></div>
          <div className="absolute inset-0 rounded-full border-4 border-red-700 opacity-75 animate-pulse"></div>
          <div className="absolute inset-4 bg-red-600 rounded-full"></div>
        </div>
      </div>
    </>
  );
};

export default Spinner;
