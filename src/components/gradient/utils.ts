import type { RGB, PaletteName } from "./types";

export const palettes = {
  viridis: [
    [68, 1, 84], // Dark purple
    [72, 40, 120], // Purple
    [62, 73, 137], // Blue
    [49, 104, 142], // Light blue
    [38, 130, 142], // Teal
    [31, 158, 137], // Turquoise
    [53, 183, 121], // Light green
    [109, 205, 89], // Green
    [180, 222, 44], // Yellow-green
    [253, 231, 37], // Yellow
  ],
  magma: [
    [0, 0, 4], // Nearly black
    [40, 12, 44], // Dark purple
    [84, 16, 72], // Purple
    [127, 24, 83], // Magenta
    [174, 44, 86], // Pink
    [215, 68, 84], // Light red
    [244, 106, 81], // Orange
    [253, 151, 96], // Light orange
    [254, 201, 141], // Pale yellow
    [252, 253, 191], // White-yellow
  ],
  inferno: [
    [0, 0, 4], // Nearly black
    [31, 12, 72], // Dark blue-purple
    [85, 16, 109], // Purple
    [136, 34, 106], // Magenta
    [186, 54, 85], // Pink
    [227, 89, 51], // Orange-red
    [249, 140, 10], // Orange
    [249, 188, 38], // Yellow-orange
    [245, 235, 69], // Yellow
    [252, 255, 164], // Pale yellow
  ],
  plasma: [
    [13, 8, 135], // Dark blue
    [75, 3, 161], // Indigo
    [125, 3, 168], // Purple
    [168, 34, 150], // Magenta
    [203, 70, 121], // Pink
    [229, 107, 93], // Light red
    [248, 148, 65], // Orange
    [253, 195, 40], // Yellow
    [240, 249, 33], // Light yellow
    [187, 255, 101], // Green-yellow
  ],
  cividis: [
    [0, 32, 76], // Dark blue
    [0, 42, 102], // Blue
    [0, 52, 110], // Light blue
    [39, 65, 106], // Blue-gray
    [84, 78, 98], // Gray
    [127, 91, 90], // Tan
    [162, 105, 84], // Light brown
    [197, 120, 79], // Orange-brown
    [231, 138, 69], // Light orange
    [253, 174, 39], // Yellow
  ],
  turbo: [
    [35, 23, 131], // Deep blue
    [42, 87, 213], // Blue
    [32, 163, 231], // Light blue
    [22, 224, 177], // Turquoise
    [67, 252, 89], // Green
    [140, 250, 40], // Lime
    [210, 226, 27], // Yellow
    [249, 176, 35], // Orange
    [249, 110, 40], // Red-orange
    [222, 34, 37], // Red
  ],
} as Record<PaletteName, RGB[]>;

// Viridis color map - These are sampled points from the gradient
export const viridisBase: RGB[] = [
  [68, 1, 84], // Dark purple
  [72, 40, 120], // Purple
  [62, 73, 137], // Blue
  [49, 104, 142], // Light blue
  [38, 130, 142], // Teal
  [31, 158, 137], // Turquoise
  [53, 183, 121], // Light green
  [109, 205, 89], // Green
  [180, 222, 44], // Yellow-green
  [253, 231, 37], // Yellow
];

// Linear interpolation between two values
export const lerp = (a: number, b: number, t: number): number =>
  a + (b - a) * t;

// Interpolate between two colors
export const lerpColor = (color1: RGB, color2: RGB, t: number): RGB => {
  return [
    Math.round(lerp(color1[0], color2[0], t)),
    Math.round(lerp(color1[1], color2[1], t)),
    Math.round(lerp(color1[2], color2[2], t)),
  ];
};

// Get color from any gradient at position t (0-1)
export const getGradientColor = (palette: PaletteName, t: number): RGB => {
  // Ensure t is within bounds
  t = Math.max(0, Math.min(1, t));

  // Find the segment of the gradient
  const base = palettes[palette];
  const numSegments = base.length - 1;
  const segmentIndex = Math.min(Math.floor(t * numSegments), numSegments - 1);
  const segmentT = t * numSegments - segmentIndex;

  // Interpolate between the two colors
  return lerpColor(base[segmentIndex], base[segmentIndex + 1], segmentT);
};

// Format color as RGB string
export const rgbString = (color: RGB): string =>
  `rgb(${color[0]}, ${color[1]}, ${color[2]})`;

// Format color as hex string
export const hexString = (color: RGB): string => {
  return `#${color[0].toString(16).padStart(2, "0")}${color[1]
    .toString(16)
    .padStart(2, "0")}${color[2].toString(16).padStart(2, "0")}`;
};

// Convert RGB to HSL
export const rgbToHsl = ([r, g, b]: RGB): [number, number, number] => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [h * 360, s * 100, l * 100];
};

// Convert HSL to RGB
export const hslToRgb = ([h, s, l]: [number, number, number]): RGB => {
  h /= 360;
  s /= 100;
  l /= 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

// Apply color filter
export const applyFilter = (color: RGB, filter: ColorFilterConfig): RGB => {
  const [h, s, l] = rgbToHsl(color);

  switch (filter.type) {
    case "desaturate":
      return hslToRgb([h, s * (1 - filter.intensity), l]);
    case "saturate":
      return hslToRgb([h, s * (1 + filter.intensity), l]);
    case "darken":
      return hslToRgb([h, s, l * (1 - filter.intensity)]);
    case "lighten":
      return hslToRgb([h, s, l + (100 - l) * filter.intensity]);
    case "invert":
      return [
        Math.round(255 * filter.intensity - color[0] * filter.intensity),
        Math.round(255 * filter.intensity - color[1] * filter.intensity),
        Math.round(255 * filter.intensity - color[2] * filter.intensity),
      ];
    default:
      return color;
  }
};
