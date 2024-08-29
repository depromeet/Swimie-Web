import { Response } from '@/apis';
import { TimeLineContent } from '@/features/main';
import { MemberProfile } from '@/types';

import { NewsItemWrapperProps } from '../components';

export type NewsContent = TimeLineContent & NewsItemWrapperProps;

export type NewsResponse = Response<{
  content: Array<NewsContent>;
  pageSize: number;
  cursorId: number;
  hasNext: boolean;
}>;

export interface FolowingSummaryData {
  followings: Array<MemberProfile>;
  followingCount: number;
}

export type FollowingSummaryResponse = Response<FolowingSummaryData>;
