'use client';

import { useState } from 'react';

export function useProgressIndicator() {
  const [step, setStep] = useState(0);

  const next = () => {
    setStep((prev) => (prev += 1));
  };

  const prev = () => {
    setStep((prev) => (prev -= 1));
  };

  const skip = () => {
    setStep(5);
  };

  return { step, handlers: { next, prev, skip } };
}
