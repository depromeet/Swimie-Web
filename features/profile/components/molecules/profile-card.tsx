import Link from 'next/link';

import { flex } from '@/styled-system/patterns';

import { useProfileData } from '../../hooks';

interface ProfileCardProps {
  id: number;
}

export function ProfileCard({ id }: ProfileCardProps) {
  const { data: profileData } = useProfileData(id);
  console.log(profileData);
  return <Link href="" className={ProfileCardLayoutStyle}></Link>;
}

const ProfileCardLayoutStyle = flex({
  direction: 'column',
  alignItems: 'center',
  width: '146px',
  height: '208px',
  backgroundColor: 'fill.normal',
  borderRadius: '10px',
  shrink: 0,
});
