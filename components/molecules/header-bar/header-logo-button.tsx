'use client';

import Link from 'next/link';

import { LogoIcon } from '@/components/atoms';

interface LogoButtonProps {
  route?: string;
  className?: string;
}

export function LogoButton({ route = '/', className }: LogoButtonProps) {
  return (
    <Link href={route} className={className}>
      <LogoIcon />
    </Link>
  );
}
