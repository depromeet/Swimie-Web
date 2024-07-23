import { css } from '@/styled-system/css';

import { CameraBox } from '../../molecules/camera-box/camera-box';
import { RecordPhotoProps } from './type';

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
