import affinityPreset from "@affinity/ui/tailwind";
import defaultTheme from "tailwindcss/defaultTheme";

const productImages = ["keys-white", "london-map"];

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.vue", "../../packages/ui/**/*.vue"],
  safelist: productImages.map((image) => `bg-${image}`),
  theme: {
    extend: {
      boxShadow: {
        outline: "0 0 0 3px rgba(180, 214, 228, 0.8)",
      },
      backgroundImage: productImages.reduce(
        (acc, cur) => ({ ...acc, [cur]: `url('/images/${cur}.png')` }),
        {},
      ),
      fontFamily: {
        display: [
          '"mrs-eaves-xl-serif-narrow"',
          ...defaultTheme.fontFamily.sans,
        ],
        body: ['"etna-condensed"', ...defaultTheme.fontFamily.sans],
        numeric: ['"etna-xx-condensed"'],
      },
      maxWidth: {
        "screen-2xl": "1536px",
        "screen-3xl": "1792px",
      },
    },
  },
  presets: [affinityPreset],
};
