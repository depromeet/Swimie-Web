import { SwimIcon } from '@/components/atoms';
import { css, cva, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

interface SelectBoxProps {
  label: string;
  index: number;
  isSelected: boolean;
  className?: string;
  onSelectEquipment: (index: number) => void;
}

export function EquipmentSelectBox({
  label,
  index,
  isSelected,
  className,
  onSelectEquipment,
}: SelectBoxProps) {
  //디자인 확정되면 교체

  const handleEquipmentClick = () => {
    onSelectEquipment?.(index);
  };
  return (
    <div
      className={cx(
        isSelected
          ? css(layoutStyles.raw({}))
          : css(layoutStyles.raw({ isSelected: false })),
        className,
      )}
      onClick={handleEquipmentClick}
    >
      <div className={badgeStyles}>
        <SwimIcon width={40} height={40} />
      </div>
      <span className={labelStyles}>{label}</span>
    </div>
  );
}

const layoutStyles = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  variants: {
    isSelected: {
      true: { opacity: 1 },
      false: { opacity: 0.4 },
    },
  },
});

const badgeStyles = flex({
  justifyContent: 'center',
  alignItems: 'center',
  width: '20vw',
  height: '20vw',
  backgroundColor: 'fill.normal',
  borderRadius: '10px',
  marginBottom: '4px',
});

const labelStyles = css({
  textStyle: 'body2.normal',
  fontWeight: 500,
});
