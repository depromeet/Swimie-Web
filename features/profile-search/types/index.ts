import { Response } from '@/apis';
import { MemberProfile } from '@/types';

export type ProfileSearch = Response<{
  memberInfoResponses: MemberProfile[];
  cursorId: number;
  hasNext: boolean;
}>;
