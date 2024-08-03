import { SwimIcon } from '@/components/atoms';
import { css, cva, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

interface EquipmentSelectBoxProps {
  label: string;
  index: number;
  isSelected: boolean;
  className?: string;
  onSelectEquipment: (index: number) => void;
}

/**
 * @param label 장비 box의 label값
 * @param index 장비의 index
 * @param isSelected 장비가 선택되었는지 여부
 * @param className 외부 스타일 주입
 * @param onSelectEquipment 클릭 된 장비의 index를 넘겨받는 function
 */
export function EquipmentSelectBox({
  label,
  index,
  isSelected,
  className,
  onSelectEquipment,
}: EquipmentSelectBoxProps) {
  const handleEquipmentClick = () => {
    onSelectEquipment?.(index);
  };

  return (
    <div
      className={cx(
        css(layoutStyles.raw({ isSelected: isSelected })),
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
    maxWidth: '600px',
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
  maxWidth: '120px',
  maxHeight: '120px',
  backgroundColor: 'fill.normal',
  borderRadius: '10px',
  marginBottom: '4px',
});

const labelStyles = css({
  textStyle: 'body2.normal',
  fontWeight: 500,
});
