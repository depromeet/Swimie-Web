'use client';

import { useRouter } from 'next/navigation';

import { LogoIcon } from '@/components/atoms';

interface LogoButtonProps {
  className?: string;
}

export function LogoButton({ className }: LogoButtonProps) {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <button className={className} onClick={handleLogoClick}>
      <LogoIcon />
    </button>
  );
}
