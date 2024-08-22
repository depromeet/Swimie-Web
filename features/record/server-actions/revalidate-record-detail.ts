'use server';

import { revalidateTag } from 'next/cache';

export const revalidateRecordDetail = (tag: string) => {
  revalidateTag(tag);
};
