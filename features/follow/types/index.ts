import { Response } from '@/apis';
import { MemberProfile } from '@/types';

export type FollowTab = 'follow' | 'following';

export type ProfileFollow = Response<{
  contents: MemberProfile[];
  cursorId: number;
  hasNext: boolean;
}>;
