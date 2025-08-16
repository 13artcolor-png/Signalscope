
import * as React from "react";

interface SelectProps {
  children: React.ReactNode;
}

export function Select({ children }: SelectProps) {
  return (
    <div className="relative w-full">
      <select className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900">
        {children}
      </select>
      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
        ▼
      </span>
    </div>
  );
}
