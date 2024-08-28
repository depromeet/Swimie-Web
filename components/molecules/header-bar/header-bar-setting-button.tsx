'use client';

import Link from 'next/link';

import { SettingIcon } from '@/components/atoms';

interface LogoButtonProps {
  className?: string;
}

export function SettingButton({ className }: LogoButtonProps) {
  return (
    <Link href="/setting" className={className}>
      <SettingIcon />
    </Link>
  );
}
