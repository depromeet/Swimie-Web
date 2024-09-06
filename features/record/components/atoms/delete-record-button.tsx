import { css } from '@/styled-system/css';

export function DeleteRecordButton() {
  return <button className={buttonStyles}>삭제</button>;
}

const buttonStyles = css({
  textStyle: 'body2.normal',
  color: 'status.negative',
  fontWeight: 500,
});
