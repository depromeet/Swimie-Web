import Link from 'next/link';

import { FindMemberIcon } from '@/components/atoms';

export const FindMemberButton = () => {
  return (
    <Link href="/">
      <FindMemberIcon width={24} height={24} />
    </Link>
  );
};
