import dynamic from 'next/dynamic';

import { fetchData } from '@/apis/fetch-data';
import { LoadingArea } from '@/components/atoms';
import { HeaderBar } from '@/components/molecules';
import {
  DetailDescriptionSection,
  DetailDiarySection,
  type RecordDetailType,
} from '@/features/record-detail';
import { EditButton } from '@/features/record-detail/components';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

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
  );

  // TODO: isMyRecordDetail (editButton, cheerButton) 분기처리 필요
  if (!data) return null;
  return (
    <>
      <HeaderBar>
        <HeaderBar.BackButton />
        <HeaderBar.Title>
          {data.member?.name ?? '스위미'}의 수영 기록
        </HeaderBar.Title>
        <HeaderBar.RightIcons>
          {[{ icon: <EditButton memoryId={params.id} />, key: 'edit' }]}
        </HeaderBar.RightIcons>
        <div className={header.textStyle}></div>
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

const header = {
  textStyle: flex({
    w: 'full',
    justify: 'center',
    align: 'center',
    color: 'text.normal',
    textStyle: 'heading6',
    fontWeight: 'medium',
  }),

  editButtonStyle: css({
    color: 'primary.swim.총거리.default',
    textStyle: 'body2.normal',
    fontWeight: 'medium',
    mr: '8px',
  }),
};

const containerStyle = flex({
  direction: 'column',
  gap: '12px',
  backgroundColor: 'background.gray',
});

const loadingWrapperStyle = css({
  backgroundColor: 'white',
});
