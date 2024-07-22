'use client';

import { useRouter } from 'next/navigation';

import { LeftArrowIcon } from '../Icons';
import { BackArrowProps } from './type';

export function BackArrow({ className, backArrowClick }: BackArrowProps) {
  const router = useRouter();

  const handleBackClick = () => {
    backArrowClick ? backArrowClick() : router.back();
  };
  return (
    <div className={className} onClick={handleBackClick}>
      <LeftArrowIcon />
    </div>
  );
}
