export type RGB = [number, number, number];

export interface ColorSample {
  rgb: RGB;
  rgbStr: string;
  hexStr: string;
  filteredRgb: RGB;
  filteredRgbStr: string;
  filteredHexStr: string;
  t: number;
}

export type PaletteName =
  | "viridis"
  | "magma"
  | "inferno"
  | "plasma"
  | "cividis"
  | "turbo";

export type ColorFilter =
  | "none"
  | "desaturate"
  | "saturate"
  | "invert"
  | "darken"
  | "lighten";

export interface ColorFilterConfig {
  type: ColorFilter;
  intensity: number; // 0-1
}

export interface GradientControlsProps {
  numColors: number;
  startBoundary: number;
  endBoundary: number;
  selectedPalette: PaletteName;
  filter: ColorFilterConfig;
  onNumColorsChange: (value: number) => void;
  onStartBoundaryChange: (value: number) => void;
  onEndBoundaryChange: (value: number) => void;
  onPaletteChange: (palette: PaletteName) => void;
  onFilterChange: (filter: ColorFilterConfig) => void;
}

export interface ColorDisplayProps {
  showHex: boolean;
  onToggleFormat: () => void;
}

export interface GradientDisplayProps {
  startBoundary: number;
  endBoundary: number;
  selectedPalette: PaletteName;
  filter: ColorFilterConfig;
}

export interface ColorSamplesProps {
  colors: ColorSample[];
  showHex: boolean;
  copied: number | null;
  onCopy: (text: string, index: number) => void;
  useFiltered: boolean;
}
