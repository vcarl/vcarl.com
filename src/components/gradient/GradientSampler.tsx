import React, { useState, useEffect, useMemo } from "react";
import type { ColorSample, PaletteName, ColorFilterConfig } from "./types";
import { getGradientColor, rgbString, hexString, applyFilter } from "./utils";
import GradientControls from "./GradientControls";
import ColorDisplay from "./ColorDisplay";
import GradientDisplay from "./GradientDisplay";
import ColorSamples from "./ColorSamples";
import { H1 } from "../Typography";

const GradientSampler: React.FC = () => {
  const [numColors, setNumColors] = useState<number>(5);
  const [startBoundary, setStartBoundary] = useState<number>(0);
  const [endBoundary, setEndBoundary] = useState<number>(100);
  const [showHex, setShowHex] = useState<boolean>(true);
  const [copied, setCopied] = useState<number | null>(null);
  const [selectedPalette, setSelectedPalette] =
    useState<PaletteName>("viridis");
  const [filter, setFilter] = useState<ColorFilterConfig>({
    type: "none",
    intensity: 0.5,
  });

  // Generate colors when numColors, boundaries, or palette changes
  const colors = useMemo(() => {
    if (numColors < 2) return [];

    const startT = startBoundary / 100;
    const endT = endBoundary / 100;
    const rangeT = endT - startT;

    const newColors: ColorSample[] = [];
    for (let i = 0; i < numColors; i++) {
      const t = startT + (i / (numColors - 1)) * rangeT;
      const color = getGradientColor(selectedPalette, t);
      const filteredColor = applyFilter(color, filter);
      newColors.push({
        rgb: color,
        rgbStr: rgbString(color),
        hexStr: hexString(color),
        filteredRgb: filteredColor,
        filteredRgbStr: rgbString(filteredColor),
        filteredHexStr: hexString(filteredColor),
        t: t,
      });
    }
    return newColors;
  }, [numColors, startBoundary, endBoundary, selectedPalette, filter]);

  // Copy color to clipboard
  const copyToClipboard = (text: string, index: number): void => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(index);
      setTimeout(() => setCopied(null), 1500);
    });
  };

  // Handle boundary changes
  const handleStartBoundaryChange = (newValue: number): void => {
    setStartBoundary(newValue);
    if (endBoundary < newValue + 5) {
      setEndBoundary(newValue + 5);
    }
  };

  const handleEndBoundaryChange = (newValue: number): void => {
    setEndBoundary(newValue);
    if (startBoundary > newValue - 5) {
      setStartBoundary(newValue - 5);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <H1 className="flex justify-between items-center">
        Color Gradient Sampler
        <ColorDisplay
          showHex={showHex}
          onToggleFormat={() => setShowHex(!showHex)}
        />
      </H1>

      <GradientControls
        numColors={numColors}
        startBoundary={startBoundary}
        endBoundary={endBoundary}
        selectedPalette={selectedPalette}
        onNumColorsChange={setNumColors}
        onStartBoundaryChange={handleStartBoundaryChange}
        onEndBoundaryChange={handleEndBoundaryChange}
        onPaletteChange={setSelectedPalette}
        filter={filter}
        onFilterChange={setFilter}
      />

      <GradientDisplay
        startBoundary={startBoundary}
        endBoundary={endBoundary}
        selectedPalette={selectedPalette}
        filter={filter}
      />

      <ColorSamples
        colors={colors}
        showHex={showHex}
        copied={copied}
        onCopy={copyToClipboard}
        useFiltered={filter.type !== "none"}
      />
    </div>
  );
};

export default GradientSampler;
