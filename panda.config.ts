import { defineConfig, defineGlobalStyles } from '@pandacss/dev';

import { textStyles } from './styles';
import { paletteColors, semanticColors } from './styles/colors';
import { shadowStyles } from './styles/shadows';

const globalCss = defineGlobalStyles({
  'html, body': {
    w: 'full',
    h: 'full',
  },
});

export default defineConfig({
  // Whether to use css reset
  globalCss,

  preflight: true,

  // Where to look for your css declarations
  include: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './features/**/*.{js,jsx,ts,tsx}',
  ],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      textStyles,
      tokens: {
        fontWeights: {
          regular: { value: '400' },
        },
        colors: paletteColors,
        shadows: shadowStyles,
      },
      semanticTokens: {
        colors: semanticColors,
      },
    },
  },

  // The output directory for your css system
  outdir: 'styled-system',
});
