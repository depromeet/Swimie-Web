'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { BackButton, HeaderBar } from '@/components/molecules';
import { Step1 } from '@/features/setting/components';
import { Step2 } from '@/features/setting/components';
import { Step3 } from '@/features/setting/components';

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
        return <Step1 onClickListItem={handleListItemClick} />;
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
