'use client';

import Link from 'next/link';

import { BellIcon } from '@/components/atoms';

interface LogoButtonProps {
  className?: string;
}

export function AlarmButton({ className }: LogoButtonProps) {
  return (
    <Link href="/alarm" className={className}>
      <BellIcon />
    </Link>
  );
}
