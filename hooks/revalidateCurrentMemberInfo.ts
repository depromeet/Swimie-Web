'use server';

import { revalidateTag } from 'next/cache';

export const revalidateCurrentMemberInfo = () => {
  revalidateTag('currentMember');
};
