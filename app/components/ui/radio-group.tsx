
import * as React from "react";

interface RadioGroupProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
}

export function RadioGroup({ options, value, onChange }: RadioGroupProps) {
  return (
    <div className="flex space-x-6">
      {options.map((opt) => (
        <label
          key={opt.value}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <input
            type="radio"
            value={opt.value}
            checked={value === opt.value}
            onChange={(e) => onChange(e.target.value)}
            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <span className="font-medium text-gray-700">{opt.label}</span>
        </label>
      ))}
    </div>
  );
}
