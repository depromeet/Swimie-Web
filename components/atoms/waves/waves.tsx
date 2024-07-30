const AMPLITUDE_COEFFICIENT = 11;
const WAVE_MARGIN = 0.02;

export const Waves = ({
  waves,
  width,
  height,
}: {
  waves: Array<{ color: string; waveHeight: number }>;
  width: number;
  height: number;
}) => {
  const waveAmplitude = (AMPLITUDE_COEFFICIENT * width) / height;
  const generateFirstPath = (waveHeight: number, offsetY: number) => {
    waveHeight = height * (waveHeight - WAVE_MARGIN);
    offsetY -= waveHeight;

    return `
    M 0 ${offsetY}
    Q ${width / 4} ${offsetY + waveAmplitude} ${width / 2} ${offsetY}
    T ${width} ${offsetY}
    V ${offsetY + waveHeight}
    T 0 ${offsetY + waveHeight}
    Z
  `;
  };

  const generatePath = (waveHeight: number, offsetY: number) => {
    waveHeight = height * (waveHeight - WAVE_MARGIN);
    offsetY -= waveHeight;

    return `
    M 0 ${offsetY}
    Q ${width / 4} ${offsetY + waveAmplitude} ${width / 2} ${offsetY}
    T ${width} ${offsetY}
    V ${offsetY + waveHeight}
    Q ${(width / 4) * 3} ${offsetY + waveHeight - waveAmplitude} ${width / 2} ${offsetY + waveHeight}
    T 0 ${offsetY + waveHeight}
    Z
  `;
  };

  let offsetY = height;
  const waveGap = (height / 100) * 2;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ background: 'none' }}
    >
      {waves.map((wave, index) => {
        const { color, waveHeight } = wave;
        const pathData =
          index !== 0
            ? generatePath(waveHeight, offsetY)
            : generateFirstPath(waveHeight, offsetY);
        offsetY -= height * (waveHeight - WAVE_MARGIN) + waveGap;
        return <path key={index} d={pathData} fill={color} />;
      })}
    </svg>
  );
};
