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

type RecordDetail = {
  params: { id: string };
};
export default async function RecordDetail({ params }: RecordDetail) {
  const { data } = await fetchData<{ data: RecordDetailType }>(
    `/memory/${params.id}`,
    'GET',
  );

  // TODO: isMyRecordDetail 분기처리 필요
  // TODO: add loading state
  if (!data) return null;
  return (
    <>
      <HeaderBar rightContent={<EditButton memoryId={params.id} />}>
        <div className={header.textStyle}>
          {data.member?.name ?? '스위미'}의 수영 기록
        </div>
      </HeaderBar>
      <article className={containerStyle}>
        <button className={fabCheerButton}>정지영님에게 응원 보내기 👏</button>
        {/* preview section */}
        <DynamicPreviewSection data={data} />
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
  position: 'relative',
  direction: 'column',
  gap: '12px',
  backgroundColor: 'background.gray',
});

const fabCheerButton = css({
  position: 'fixed',
  right: '20px',
  bottom: '35px',
  p: '10px 20px',
  backgroundColor: 'primary.swim.총거리.default',
  color: 'white',
  textStyle: 'body2.normal',
  fontWeight: 'bold',
  rounded: 'full',
  cursor: 'pointer',
  shadow: 'emphasize',
});

const loadingWrapperStyle = css({
  backgroundColor: 'white',
});
