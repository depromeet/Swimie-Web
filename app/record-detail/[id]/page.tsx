import { fetchData } from '@/apis/fetch-data';
import {
  DetailDescriptionSection,
  DetailDiarySection,
  DetailPreviewSection,
  type RecordDetailType,
} from '@/features/record-detail';
import { flex } from '@/styled-system/patterns';

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
      <DetailPreviewSection data={data} />
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
