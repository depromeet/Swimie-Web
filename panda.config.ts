import { defineConfig, defineGlobalStyles } from '@pandacss/dev'

const globalCss = defineGlobalStyles({
  'html, body': {
    w: 'full',
    h: 'full',
  },
})

export default defineConfig({
  // Whether to use css reset
  globalCss,

  preflight: true,

  // Where to look for your css declarations
  include: ['./app/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          green: {
            50: { value: '#32D5BA' },
          },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: 'styled-system',
})
