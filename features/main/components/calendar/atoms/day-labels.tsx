import { END_OF_DAY, nameOfDays, START_OF_DAY } from '@/constants/date';
import { css, cva, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

type Weekend = 'sunday' | 'saturday' | undefined;

const dayTypeMap = new Map<number, string>([
  [START_OF_DAY, 'sunday'],
  [END_OF_DAY, 'saturday'],
]);

export const DayLabels = () => {
  return (
    <div className={containerStyles}>
      {nameOfDays.map((day, index) => {
        const type = (dayTypeMap.get(index) || undefined) as Weekend;
        return (
          <p
            key={index}
            className={cx(
              dayTextStyles,
              colorOfDays({
                type,
              }),
            )}
          >
            {day}
          </p>
        );
      })}
    </div>
  );
};

const containerStyles = flex({
  width: 'full',
  gap: '3px',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const dayTextStyles = css({
  width: 'full',
  textAlign: 'center',
  textStyle: 'label2',
  fontWeight: 'medium',
});

const colorOfDays = cva({
  base: { color: 'text.placeHolder' },
  variants: {
    type: {
      saturday: { color: 'primary.swim.총거리.default' },
      sunday: { color: 'status.negative' },
    },
  },
});
