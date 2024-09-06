import { Response } from '@/apis';
import { MemberProfile } from '@/types';

export type BlockedList = Response<{
  blackMembers: MemberProfile[];
  cursorId: number;
  hasNext: boolean;
}>;
