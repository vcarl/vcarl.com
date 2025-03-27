import React from "react";
import type { GradientDisplayProps } from "./types";
import { palettes, applyFilter } from "./utils";

const GradientDisplay: React.FC<GradientDisplayProps> = ({
  startBoundary,
  endBoundary,
  selectedPalette,
  filter,
}) => {
  const gradientStops = palettes[selectedPalette]
    .map((color, i, arr) => {
      const percent = (i / (arr.length - 1)) * 100;
      const displayColor =
        filter.type === "none" ? color : applyFilter(color, filter);
      return `rgb(${displayColor[0]}, ${displayColor[1]}, ${displayColor[2]}) ${percent}%`;
    })
    .join(", ");

  return (
    <div className="w-full h-12 mb-6 rounded overflow-hidden relative">
      <div
        className="w-full h-full"
        style={{
          background: `linear-gradient(to right, ${gradientStops})`,
        }}
      />
      {/* Boundary indicators */}
      <div
        className="absolute top-0 h-full w-0.5 bg-white"
        style={{
          left: `${startBoundary}%`,
          boxShadow: "0 0 5px rgba(0,0,0,0.5)",
        }}
      />
      <div
        className="absolute top-0 h-full w-0.5 bg-white"
        style={{
          left: `${endBoundary}%`,
          boxShadow: "0 0 5px rgba(0,0,0,0.5)",
        }}
      />
      {/* Selected region highlight */}
      <div
        className="absolute top-0 h-full border-2 border-white"
        style={{
          left: `${startBoundary}%`,
          width: `${endBoundary - startBoundary}%`,
          boxShadow: "0 0 5px rgba(0,0,0,0.3)",
          background: "rgba(255,255,255,0.1)",
        }}
      />
    </div>
  );
};

export default GradientDisplay;
