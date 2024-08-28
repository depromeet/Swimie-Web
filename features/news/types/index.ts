import { Response } from '@/apis';
import { ProfileFollowContent } from '@/features/follow';
import { TimeLineContent } from '@/features/main';

import { NewsItemWrapperProps } from '../components';

export type NewsContent = TimeLineContent & NewsItemWrapperProps;

export type NewsResponse = Response<{
  content: Array<NewsContent>;
  pageSize: number;
  cursorId: number;
  hasNext: boolean;
}>;

export interface FolowingSummaryData {
  followings: Array<ProfileFollowContent>;
  followingCount: number;
}

export type FollowingSummaryResponse = Response<FolowingSummaryData>;
