'use client';

import { useRouter } from 'next/navigation';

import { LeftArrowIcon } from '@/components/atoms';

type BackButton = {
  onClickBack?: () => void;
  className?: string;
};
export const BackButton = ({ onClickBack, className }: BackButton) => {
  const router = useRouter();

  const handleBackClick = () => {
    onClickBack ? onClickBack() : router.back();
  };

  return (
    <button className={className} onClick={handleBackClick}>
      <LeftArrowIcon />
    </button>
  );
};
