import { css, cva } from '@/styled-system/css';

export const layoutStyles = {
  total: cva({
    base: { display: 'flex', position: 'relative', padding: '16px 20px' },
    variants: {
      hasRead: {
        true: {},
        false: {
          backgroundColor: '#F7FBFF',
        },
      },
    },
  }),
  text: cva({
    base: {
      direction: 'column',
      justifyContent: 'space-between',
      marginLeft: '16px',
      gap: '4px',
      wordBreak: 'keep-all',
    },
    variants: {
      type: {
        FOLLOW: {
          marginRight: '82px',
        },
        FRIEND: {
          marginRight: '82px',
        },
        CHEER: {},
      },
    },
  }),
};

export const textStyles = {
  main: css({
    textStyle: 'body2.normal',
    fontWeight: 400,
    color: 'text.normal',
  }),
  userName: css({
    textStyle: 'body2.normal',
    fontWeight: 600,
    color: 'text.normal',
  }),
  time: css({
    textStyle: 'label2',
    color: 'text.alternative',
    fontWeight: 400,
  }),
  description: css({
    textStyle: 'body2.normal',
    fontWeight: 400,
    color: 'text.alternative',
  }),
};
