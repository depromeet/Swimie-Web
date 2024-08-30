import Link from 'next/link';
import React, { forwardRef } from 'react';

import { css } from '@/styled-system/css';
import {
  convertTimeToElapsedTime,
  formatDateToKoreanExceptYear,
} from '@/utils';

import { useReadNotification } from '../../apis/use-read-notification';
import { layoutStyles, textStyles } from '../../styles';
import { CheerNotificationProps } from '../../types';
import { CheerUpIcon } from '../atoms';

export const CheerNotification = forwardRef<
  HTMLLIElement,
  CheerNotificationProps & { assignRef: boolean }
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
      assignRef,
    },
    ref,
  ) => {
    const { mutate: readNotification } = useReadNotification();

    const handleListElementClick = () => {
      readNotification({ notificationId, type });
    };

    return (
      <Link href={`record-detail/${memoryId}`} onClick={handleListElementClick}>
        <li
          ref={assignRef ? ref : undefined}
          className={css(layoutStyles.total.raw({ hasRead }))}
        >
          <CheerUpIcon />
          <div className={css(layoutStyles.text.raw({ type }))}>
            {type === 'CHEER' && (
              <>
                <p className={textStyles.main}>
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
