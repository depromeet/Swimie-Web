import dynamic from 'next/dynamic';

import { fetchData } from '@/apis/fetch-data';
import { LoadingArea } from '@/components/atoms';
import {
  DetailDescriptionSection,
  DetailDiarySection,
  type RecordDetailType,
} from '@/features/record-detail';
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

  // TODO: add loading state
  if (!data) return null;
  return (
    <article className={containerStyle}>
      {/* preview section */}
      <DynamicPreviewSection data={data} />
      {/* description section */}
      <DetailDescriptionSection data={data} />
      {/* diary section */}
      <DetailDiarySection data={data} />
    </article>
  );
}

const containerStyle = flex({
  direction: 'column',
  gap: '12px',
});

const loadingWrapperStyle = css({
  backgroundColor: 'white',
});
