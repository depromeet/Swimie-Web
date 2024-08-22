import dynamic from 'next/dynamic';

import { fetchData } from '@/apis/fetch-data';
import { LeftArrowIcon, LoadingArea } from '@/components/atoms';
import { HeaderBar } from '@/components/molecules';
import {
  DetailDescriptionSection,
  DetailDiarySection,
  type RecordDetailType,
} from '@/features/record-detail';
import { EditButton } from '@/features/record-detail/components';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
const DynamicBackButton = dynamic(
  () => import('@/components/molecules').then(({ BackButton }) => BackButton),
  {
    ssr: false,
    loading: () => <LeftArrowIcon />,
  },
);

const DynamicPreviewSection = dynamic(
  () =>
    import('@/features/record-detail').then(
      ({ DetailPreviewSection }) => DetailPreviewSection,
    ),
  {
    ssr: false,
    loading: () => (
      <div className={loadingWrapperStyle}>
        <LoadingArea />
      </div>
    ),
  },
);

const DynamicCheerSection = dynamic(
  () =>
    import('@/features/record-detail').then(({ DetailCheer }) => DetailCheer),
  {
    ssr: false,
  },
);

type RecordDetail = {
  params: { id: string };
};
export default async function RecordDetail({ params }: RecordDetail) {
  const { data } = await fetchData<{ data: RecordDetailType }>(
    `/memory/${params.id}`,
    'GET',
    undefined,
    `recordDetail${params.id}`,
  );

  // TODO: isMyRecordDetail (editButton, cheerButton) 분기처리 필요
  if (!data) return null;
  return (
    <>
      <HeaderBar>
        <HeaderBar.LeftContent>
          <DynamicBackButton />
        </HeaderBar.LeftContent>
        <HeaderBar.Title>
          {data.member?.name ?? '스위미'}의 수영 기록
        </HeaderBar.Title>
        <HeaderBar.RightContent>
          {[{ component: <EditButton memoryId={params.id} />, key: 'edit' }]}
        </HeaderBar.RightContent>
      </HeaderBar>

      <article className={containerStyle}>
        <div>
          {/* cheer section */}
          <DynamicCheerSection data={data} />
          {/* preview section */}
          <DynamicPreviewSection data={data} />
        </div>

        {/* description section */}
        <DetailDescriptionSection data={data} />
        {/* diary section */}
        <DetailDiarySection data={data} />
      </article>
    </>
  );
}

const containerStyle = flex({
  direction: 'column',
  gap: '12px',
  backgroundColor: 'background.gray',
});

const loadingWrapperStyle = css({
  backgroundColor: 'white',
});
