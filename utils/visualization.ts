export const createGradient = (colors: Array<string>) => {
  if (colors.length === 2) return `${colors[0]} 0%, ${colors[1]} 80%`;
  else if (colors.length === 3)
    return `${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%`;
  return `${colors[0]} 0%, ${colors[1]} 33%, ${colors[2]} 66%, ${colors[3]} 100%`;
};
