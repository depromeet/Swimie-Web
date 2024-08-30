'use client';

import Lottie from 'lottie-react';

import animationData from '@/public/animations/loading_wave.json';

export const LoadingWave = () => {
  return (
    <div style={{ width: '60px', height: '60px' }}>
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};
