'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { BackButton, HeaderBar } from '@/components/molecules';
import Step1 from '@/features/setting/components/organisms/step-1';
import Step2 from '@/features/setting/components/organisms/step-2';
import Step3 from '@/features/setting/components/organisms/step-3';
import { flex } from '@/styled-system/patterns';

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);

  useEffect(() => {
    const queryStep = searchParams.get('step');
    if (queryStep) {
      setStep(Number(queryStep));
    }
  }, [searchParams]);

  const handleListItemClick = () => {
    setStep(2);
    router.push('?step=2');
  };

  const getStepComponent = (step: number) => {
    switch (step) {
      case 1:
        return <Step1 onListItemClick={handleListItemClick} />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      default:
        return null;
    }
  };

  return (
    <div>
      <HeaderBar>
        <HeaderBar.LeftContent>
          <BackButton />
        </HeaderBar.LeftContent>
      </HeaderBar>
      {getStepComponent(step)}
    </div>
  );
}

export const titleStyles = flex({
  padding: '20px 8px 20px 16px',
  direction: 'column',
  alignItems: 'flex-start',
  alignSelf: 'stretch',
  textStyle: 'heading2',
  fontWeight: '600',
  color: 'text.strong',
});