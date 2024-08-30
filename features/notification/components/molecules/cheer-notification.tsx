import Link from 'next/link';
import React, { forwardRef } from 'react';

import { css, cva } from '@/styled-system/css';
import {
  convertTimeToElapsedTime,
  formatDateToKoreanExceptYear,
} from '@/utils';

import { useReadNotification } from '../../apis/use-read-notification';
import { CheerNotificationProps } from '../../types';
import { CheerUpIcon } from '../atoms';

//Todo: 추후 알림 내용이 추가될 때 props가 너무 많아질 시, 합성 컴포넌트 도입 고려
//Todo: 팔로우 api 연결
//Todo: 클릭 api 처리
export const CheerNotification = forwardRef<
  HTMLLIElement,
  CheerNotificationProps
>(
  (
    {
      type,
      notificationId,
      nickname,
      memoryId,
      content,
      createdAt,
      recordCreatedAt,
      hasRead,
    },
    ref,
  ) => {
    const { mutate: readNotification } = useReadNotification();

    const handleListElementClick = () => {
      readNotification({ notificationId, type });
    };

    return (
      <Link href={`record-detail/${memoryId}`} onClick={handleListElementClick}>
        <li ref={ref} className={css(layoutStyles.total.raw({ hasRead }))}>
          <CheerUpIcon />
          <div className={css(layoutStyles.text.raw({ type }))}>
            {type === 'CHEER' && (
              <>
                <p>
                  {formatDateToKoreanExceptYear(recordCreatedAt)} 기록에{' '}
                  <span className={textStyles.userName}>{nickname}</span>
                  님이 응원을 남겼어요.
                </p>
                <p className={textStyles.description}>{`"${content} "`}</p>
              </>
            )}
            <span className={textStyles.time}>
              {convertTimeToElapsedTime(createdAt)}
            </span>
          </div>
        </li>
      </Link>
    );
  },
);

CheerNotification.displayName = 'CheerNotification';

const layoutStyles = {
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
          width: '60%',
        },
        FRIEND: {
          width: '60%',
        },
        CHEER: {},
      },
    },
  }),
  button: css({
    position: 'absolute',
    right: '20px',
    backgroundColor: 'transparent',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#3B87F4',
      opacity: 0.05,
    },
  }),
};

const textStyles = {
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
