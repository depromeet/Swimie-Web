import { Response } from '@/apis';
import { MemberProfile } from '@/types';

export type FollowTab = 'follower' | 'following';

export type ProfileFollow = Response<{
  contents: MemberProfile[];
  cursorId: number;
  hasNext: boolean;
}>;
