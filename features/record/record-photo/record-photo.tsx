import { CameraBox } from '@/components/molecules';
import { css } from '@/styled-system/css';

interface RecordPhotoProps {
  title: string;
}

export function RecordPhoto({ title }: RecordPhotoProps) {
  return (
    <section className={recordPhotoStyles}>
      <h1 className={titleStyles}>{title}</h1>
      <CameraBox />
    </section>
  );
}

const recordPhotoStyles = css({
  padding: '24px 20px 40px 20px',
});

const titleStyles = css({
  textStyle: 'heading4',
  fontWeight: '600',
  marginBottom: '24px',
});
