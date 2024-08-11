import { cva } from '@/styled-system/css';

type CheerItem = {
  icon?: string;
  title?: string;
  isSelected?: boolean;
};
export const CheerItem = ({ icon, title, isSelected }: CheerItem) => {
  if (!icon?.length && !title?.length) return null;
  return (
    <div className={ContainerStyle({ isSelected })}>
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
