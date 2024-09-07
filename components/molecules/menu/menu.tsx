import useOutsideClick from '@/hooks/use-outside-click';
import { css, cx } from '@/styled-system/css';

import { MenuItem } from './menu-item';
import { MenuItemProps } from './type';

interface MenuProps {
  isOpen: boolean;
  menuItems: MenuItemProps[];
  onClose: () => void;
  className?: string;
}

export function Menu({ isOpen, menuItems, onClose, className }: MenuProps) {
  const { ref } = useOutsideClick<HTMLDivElement>(isOpen, onClose);

  const handleMenuItemClick = (index: number) => {
    menuItems[index].onClick();
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div ref={ref} className={cx(layoutStyles, className)}>
      {menuItems.map((item, i) => (
        <MenuItem
          key={item.label + i}
          {...item}
          onClick={() => handleMenuItemClick(i)}
        />
      ))}
    </div>
  );
}

const layoutStyles = css({
  minW: '186px',
  position: 'absolute',
  padding: '8px 16px',
  borderRadius: '10px',
  shadow: 'emphasize',
  animation: 'fadeDown 0.2s',
});
