import { cva } from '@/styled-system/css';

type CheerItem = {
  icon?: string;
  title?: string;
  isSelected?: boolean;
};
// TODO: 로직 구현에 맞춰 props 수정
export const CheerItem = ({ icon, title, isSelected }: CheerItem) => {
  if (!icon?.length && !title?.length) return null;
  return (
    // NOTE: isSelected undefined 대응하여 Boolean 사용
    <div className={ContainerStyle({ isSelected: Boolean(isSelected) })}>
      {icon?.length && <div>{icon}</div>}
      {title?.length && <p>{title}</p>}
    </div>
  );
};

const ContainerStyle = cva({
  base: {
    width: 'fit-content',
    display: 'flex',
    gap: '8px',
    p: '8px 14px',
    color: 'text.normal',
    textStyle: 'body1.normal',
    fontWeight: 'medium',
    border: '1px solid',
    rounded: '8px',
  },
  variants: {
    isSelected: {
      true: {
        color: 'blue.45',
        borderColor: 'blue.90',
        backgroundColor: 'blue.95',
      },
      false: {
        color: 'text.normal',
        borderColor: 'line.neutral',
        backgroundColor: 'white',
      },
    },
  },
});
