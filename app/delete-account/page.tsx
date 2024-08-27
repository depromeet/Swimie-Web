import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';

import { LoadingArea } from '@/components/atoms';

const StepComponent = dynamic(() => import('./index'), {
  suspense: true,
});

export default function Page() {
  return (
    <Suspense fallback={<LoadingArea />}>
      <StepComponent />
    </Suspense>
  );
}
