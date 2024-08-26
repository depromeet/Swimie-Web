'use client';

import Link from 'next/link';

import { BellIcon } from '@/components/atoms';

interface LogoButtonProps {
  className?: string;
}

export function AlarmButton({ className }: LogoButtonProps) {
  return (
    <Link href="/notification" className={className}>
      <BellIcon />
    </Link>
  );
}
