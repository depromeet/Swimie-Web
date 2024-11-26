import { lazy, Suspense } from 'react';

import { Divider } from '@/components/atoms/divider';
import { RecommendedProfileCardListSkeleton } from '@/features/profile-recommend';
const RecommendedProfileItemList = lazy(() =>
  import('@/features/profile-recommend').then((module) => ({
    default: module.RecommendedProfileItemList,
  })),
);
import { css } from '@/styled-system/css';

export const EmptyKeyword = () => {
  return (
    <>
      <div className={containerStyle}>
        친구를 팔로우하고
        <br />
        서로의 기록에 응원을 보내보세요.
      </div>
      <Divider variant="thick" />
      <Suspense
        fallback={
          <RecommendedProfileCardListSkeleton
            variant="vertical"
            itemStyle={{ height: '64px' }}
          />
        }
      >
        <RecommendedProfileItemList title="다른 수영인과 응원을 주고 받아보세요" />
      </Suspense>
    </>
  );
};

const containerStyle = css({
  m: '40px auto 40px',
  textStyle: 'body2.normal',
  color: 'text.alternative',
  textAlign: 'center',
});
