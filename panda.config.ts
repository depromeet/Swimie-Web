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
    './stories/**/*.{js,jsx,ts,tsx}',
  ],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      textStyles,
      tokens: {
        sizes: {
          maxWidth: {
            value: '600px',
          },
        },
        fontWeights: {
          regular: { value: '400' },
        },
        colors: paletteColors,
        shadows: shadowStyles,
      },
      semanticTokens: {
        colors: semanticColors,
      },
      keyframes: {
        dimFadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: '100%' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        skeleton: {
          '0%': { backgroundColor: '#70737C14' },
          '50%': { backgroundColor: '#70737C08' },
          '100%': { backgroundColor: '#70737C14' },
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 100, transform: 'translateY(0px)' },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: 'styled-system',
});
