import { END_OF_DAY, nameOfDays, START_OF_DAY } from '@/constants/date';
import { css, cva, cx } from '@/styled-system/css';

export const DayLabels = () => {
  return (
    <div
      className={css({
        width: 'full',
        display: 'flex',
        gap: '3px',
        justifyContent: 'space-between',
        alignItems: 'center',
      })}
    >
      {nameOfDays.map((day, index) => (
        <p
          key={index}
          className={cx(
            css({
              width: 'full',
              textAlign: 'center',
              textStyle: 'label2',
              fontWeight: 'medium',
            }),
            colorOfDays({
              type:
                index === START_OF_DAY
                  ? 'sunday'
                  : index === END_OF_DAY
                    ? 'saturday'
                    : undefined,
            }),
          )}
        >
          {day}
        </p>
      ))}
    </div>
  );
};

const colorOfDays = cva({
  base: { color: 'text.placeHolder' },
  variants: {
    type: {
      saturday: { color: 'primary.swim.총거리.default' },
      sunday: { color: 'status.negative' },
    },
  },
});
