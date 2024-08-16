'use client';

import { useRouter } from 'next/navigation';

import { LogoIcon } from '@/components/atoms';

interface LogoButtonProps {
  onClickLogo?: () => void;
  className?: string;
}

export function LogoButton({ onClickLogo, className }: LogoButtonProps) {
  const router = useRouter();

  const handleLogoClick = () => {
    onClickLogo ? onClickLogo : router.push('/');
  };

  return (
    <button className={className} onClick={handleLogoClick}>
      <LogoIcon />
    </button>
  );
}
