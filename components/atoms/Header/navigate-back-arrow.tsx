'use client';

import { useRouter } from 'next/navigation';

import { LeftArrowIcon } from '../Icons';

interface NavigateBackArrowProps {
  className?: string;
  backArrowClick?: () => void;
}

export function NavigateBackArrow({
  className,
  backArrowClick,
}: NavigateBackArrowProps) {
  const router = useRouter();

  const handleNavigateBackClick = () => {
    backArrowClick ? backArrowClick() : router.back();
  };
  return (
    <div className={className} onClick={handleNavigateBackClick}>
      <LeftArrowIcon />
    </div>
  );
}
