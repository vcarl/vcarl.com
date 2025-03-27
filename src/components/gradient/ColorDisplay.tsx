import React from "react";
import type { ColorDisplayProps } from "./types";

const ColorDisplay: React.FC<ColorDisplayProps> = ({
  showHex,
  onToggleFormat,
}) => {
  return (
    <div className="mb-4">
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={showHex}
          onChange={onToggleFormat}
          className="sr-only peer"
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        <span className="ml-3 text-sm font-medium">
          {showHex ? "Showing HEX" : "Showing RGB"}
        </span>
      </label>
    </div>
  );
};

export default ColorDisplay;
