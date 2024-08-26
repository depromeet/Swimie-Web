import { BellIcon } from '@/components/atoms';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

interface NoAlarmProps {
  mainText: string;
  subText: string;
}

export function NoNotification({ mainText, subText }: NoAlarmProps) {
  return (
    <section className={layoutStyles.total}>
      <div className={layoutStyles.content}>
        <BellIcon width={80} height={80} />
        <h3 className={textStyles.main}>{mainText}</h3>
        <p className={textStyles.sub}>{subText}</p>
      </div>
    </section>
  );
}

const layoutStyles = {
  total: flex({
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100dvh - 88px)',
  }),

  content: flex({
    direction: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }),
};

const textStyles = {
  main: css({
    textStyle: 'heading6',
    fontWeight: 500,
    color: 'text.normal',
    margin: '20px 0 4px 0',
  }),

  sub: css({
    textStyle: 'body2.normal',
    fontWeight: 400,
    color: 'text.alternative',
  }),
};
