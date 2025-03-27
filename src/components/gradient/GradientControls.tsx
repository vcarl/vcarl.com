import React from "react";
import type { ColorFilter, GradientControlsProps, PaletteName } from "./types";
import { Label, Paragraph } from "../Typography";

const GradientControls: React.FC<GradientControlsProps> = ({
  numColors,
  startBoundary,
  endBoundary,
  selectedPalette,
  onNumColorsChange,
  onStartBoundaryChange,
  onEndBoundaryChange,
  onPaletteChange,
  filter,
  onFilterChange,
}) => {
  // Handle start boundary change
  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = parseInt(e.target.value);
    onStartBoundaryChange(newValue);
  };

  // Handle end boundary change
  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = parseInt(e.target.value);
    onEndBoundaryChange(newValue);
  };

  return (
    <>
      <div className="mb-6">
        <Label>Color Palette</Label>
        <select
          value={selectedPalette}
          onChange={(e) => onPaletteChange(e.target.value as PaletteName)}
          className="w-full p-2 border rounded-lg bg-white"
        >
          <option value="viridis">Viridis</option>
          <option value="magma">Magma</option>
          <option value="inferno">Inferno</option>
          <option value="plasma">Plasma</option>
          <option value="cividis">Cividis</option>
          <option value="turbo">Turbo</option>
        </select>
      </div>

      <div className="mb-6">
        <Label>
          Number of colors: <Paragraph>{numColors}</Paragraph>
        </Label>
        <input
          type="range"
          min="2"
          max="20"
          value={numColors}
          onChange={(e) => onNumColorsChange(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          {/* Start boundary slider */}
          <div>
            <Label>
              Start boundary: <Paragraph>{startBoundary}%</Paragraph>
            </Label>
            <input
              type="range"
              min="0"
              max="95"
              value={startBoundary}
              onChange={handleStartChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* End boundary slider */}
          <div>
            <Label>
              End boundary: <Paragraph>{endBoundary}%</Paragraph>
            </Label>
            <input
              type="range"
              min="5"
              max="100"
              value={endBoundary}
              onChange={handleEndChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <Label>Color Filter</Label>
        <div className="grid grid-cols-2 gap-4">
          <select
            value={filter.type}
            onChange={(e) =>
              onFilterChange({ ...filter, type: e.target.value as ColorFilter })
            }
            className="w-full p-2 border rounded-lg bg-white"
          >
            <option value="none">None</option>
            <option value="desaturate">Desaturate</option>
            <option value="saturate">Saturate</option>
            <option value="invert">Invert</option>
            <option value="darken">Darken</option>
            <option value="lighten">Lighten</option>
          </select>

          {filter.type !== "none" && (
            <div>
              <Label>
                Filter Intensity:{" "}
                <Paragraph>{Math.round(filter.intensity * 100)}%</Paragraph>
              </Label>
              <input
                type="range"
                min="0"
                max="100"
                value={filter.intensity * 100}
                onChange={(e) =>
                  onFilterChange({
                    ...filter,
                    intensity: parseInt(e.target.value) / 100,
                  })
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GradientControls;
