import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { MenuItemProps } from './type';

export function MenuItem({ icon, label, onClick }: MenuItemProps) {
  return (
    <div onClick={onClick} className={layoutStyles.total}>
      {icon && <div className={layoutStyles.icon}>{icon}</div>}
      <span className={labelStyles}>{label}</span>
    </div>
  );
}

const layoutStyles = {
  total: flex({
    padding: '8px 0',
    alignItems: 'center',
    cursor: 'pointer',
  }),
  icon: css({
    marginRight: '10px',
  }),
};

const labelStyles = css({
  textStyle: 'heading6',
  color: 'text.normal',
  fontWeight: 500,
});
