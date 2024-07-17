import { defineConfig, defineGlobalStyles } from '@pandacss/dev';

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
      tokens: {
        colors: {
          common: { 0: { value: '#000000' }, 100: { value: '#FFFFFF' } },
          neutral: {
            5: { value: '#0F0F0F' },
            10: { value: '#171717' },
            15: { value: '#1C1C1C' },
            20: { value: '#2A2A2A' },
            22: { value: '#303030' },
            30: { value: '#474747' },
            40: { value: '#5C5C5C' },
            50: { value: '#737373' },
            60: { value: '#8A8A8A' },
            70: { value: '#9B9B9B' },
            80: { value: '#B0B0B0' },
            90: { value: '#C4C4C4' },
            95: { value: '#DCDCDC' },
            99: { value: '#F7F7F7' },
          },
          coolNeutral: {
            5: { value: '#0F0F10' },
            7: { value: '#141415' },
            10: { value: '#171719' },
            15: { value: '#1B1C1E' },
            17: { value: '#212225' },
            20: { value: '#292A2D' },
            22: { value: '#2E2F33' },
            23: { value: '#333438' },
            25: { value: '#37383C' },
            30: { value: '#46474C' },
            40: { value: '#5A5C63' },
            50: { value: '#70737C' },
            60: { value: '#878A93' },
            70: { value: '#989BA2' },
            80: { value: '#AEB0B6' },
            90: { value: '#C2C4C8' },
            95: { value: '#DBDCDF' },
            96: { value: '#E1E2E4' },
            97: { value: '#EAEBEC' },
            98: { value: '#F4F4F5' },
            99: { value: '#F7F7F8' },
          },
          blue: {
            10: { value: '#001536' },
            20: { value: '#002966' },
            30: { value: '#003E9C' },
            40: { value: '#0054D1' },
            45: { value: '#005EEB' },
            50: { value: '#0066FF' },
            55: { value: '#1A75FF' },
            60: { value: '#3385FF' },
            70: { value: '#69A5FF' },
            80: { value: '#9EC5FF' },
            90: { value: '#C9DEFE' },
            95: { value: '#EAF2FE' },
            99: { value: '#F7FBFF' },
          },
          red: {
            10: { value: '#3B0101' },
            20: { value: '#750404' },
            30: { value: '#B20C0C' },
            40: { value: '#E52222' },
            50: { value: '#FF4242' },
            60: { value: '#FF6363' },
            70: { value: '#FF8C8C' },
            80: { value: '#FFB5B5' },
            90: { value: '#FED5D5' },
            95: { value: '#FEECEC' },
            99: { value: '#FFFAFA' },
          },
          green: {
            10: { value: '#00240C' },
            20: { value: '#004517' },
            30: { value: '#006E25' },
            40: { value: '#009632' },
            50: { value: '#00BF40' },
            60: { value: '#1ED45A' },
            70: { value: '#49E57D' },
            80: { value: '#7DF5A5' },
            90: { value: '#ACFCC7' },
            95: { value: '#D9FFE6' },
            99: { value: '#F2FFF6' },
          },
        },
        shadows: {
          normal: {
            value: [
              '0px 0px 1px 0px #00000014',
              '0px 0px 1px 0px #00000014',
              '0px 1px 2px 0px #0000001F',
            ],
          },
          emphasize: {
            value: [
              '0px 0px 1px 0px #00000014',
              '0px 1px 4px 0px #00000014',
              '0px 2px 8px 0px #0000001F',
            ],
          },
          strong: {
            value: [
              '0px 0px 4px 0px #00000014',
              '0px 4px 8px 0px #00000014',
              '0px 6px 12px 0px #0000001F',
            ],
          },
          heavy: {
            value: [
              '0px 0px 8px 0px #00000014',
              '0px 8px 16px 0px #00000014',
              '0px 16px 20px 0px #0000001F',
            ],
          },
        },
      },
      semanticTokens: {
        colors: {
          primary: {
            swim: {
              자유형: {
                default: { value: '#71C2FC' },
                sub: { value: '#CDEAFF' },
              },
              배영: {
                default: { value: '#58E06E' },
                sub: { value: '#AFF3BA' },
              },
              평영: {
                default: { value: '#FFCD1D' },
                sub: { value: '#FFECAB' },
              },
              접영: {
                default: { value: '#FF9F59' },
                sub: { value: '#FFDCC2' },
              },
              킥판: {
                default: { value: '#9859FF' },
                sub: { value: '#DBC6FF' },
              },
              총거리: {
                default: { value: '{colors.blue.60}' },
                sub: { value: '#C2CCF0' },
              },
            },
          },
          text: {
            normal: { value: '{colors.coolNeutral.10}' },
            strong: { value: '{colors.common.0}' },
            neutral: { value: '#2E2F33E0' },
            alternative: { value: '#37383C9C' },
            placeHolder: { value: '#37383C47' },
            disable: { value: '#37383C29' },
          },
          background: {
            white: { value: '{colors.common.100}' },
            gray: { value: '{colors.coolNeutral.99}' },
          },
          line: {
            normal: { value: '#70737C38' },
            neutral: { value: '#70737C29' },
            alternative: { value: '#70737C14' },
          },
          status: {
            positive: { value: '{colors.green.50}' },
            destructive: { value: '{colors.red.50}' },
          },
          static: {
            white: { value: '{colors.common.100}' },
            black: { value: '{colors.common.0}' },
          },
          fill: {
            normal: { value: '#70737C14' },
            strong: { value: '#70737C29' },
            alternative: { value: '#70737C0D' },
            disable: { value: '{colors.coolNeutral.98}' },
            highlight: { value: '{colors.coolNeutral.25}' },
          },
          material: {
            dimmer: { value: '#17171985' },
          },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: 'styled-system',
});
