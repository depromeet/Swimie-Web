import { swims } from '@/constants/visualization';

export const createGradient = (colors: Array<string>) => {
  if (colors.length === 2) return `${colors[0]} 0%, ${colors[1]} 80%`;
  else if (colors.length === 3)
    return `${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%`;
  return `${colors[0]} 0%, ${colors[1]} 33%, ${colors[2]} 66%, ${colors[3]} 100%`;
};

export const getSwimColor = (name: string) => {
  for (const currentSwim of swims) {
    if (name === currentSwim.name) {
      return currentSwim.color;
    }
  }
  return '';
};
