import React from "react";
import type { ColorSamplesProps } from "./types";
import { Paragraph, SmallText } from "../Typography";

const ColorSamples: React.FC<ColorSamplesProps> = ({
  colors,
  showHex,
  copied,
  onCopy,
  useFiltered,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {colors.map((color, index) => {
        const displayColor = useFiltered ? color.filteredRgbStr : color.rgbStr;
        const displayText = useFiltered
          ? showHex
            ? color.filteredHexStr
            : color.filteredRgbStr
          : showHex
            ? color.hexStr
            : color.rgbStr;

        return (
          <div
            key={index}
            className="rounded overflow-hidden shadow-md transition-transform hover:scale-105"
            onClick={() => onCopy(displayText, index)}
          >
            <div
              className="h-24 w-full"
              style={{ backgroundColor: displayColor }}
            />
            <div className="p-3 bg-white">
              <div className="flex justify-between items-center">
                <Paragraph>{displayText}</Paragraph>
                <Paragraph>{Math.round(color.t * 100)}%</Paragraph>
              </div>
              {copied === index && (
                <SmallText className="text-green-600 mt-1">
                  Copied to clipboard!
                </SmallText>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ColorSamples;
