import Link from 'next/link';
import React from 'react';

import { css } from '@/styled-system/css';
import {
  convertTimeToElapsedTime,
  formatDateToKoreanExceptYear,
} from '@/utils';

import { layoutStyles, textStyles } from '../../styles';
import { CheerNotificationProps } from '../../types';
import { CheerUpIcon } from '../atoms';

export function CheerNotification({
  type,
  memoryId,
  hasRead,
  recordCreatedAt,
  nickname,
  content,
  createdAt,
}: CheerNotificationProps) {
  return (
    <Link href={`record-detail/${memoryId}`}>
      <li className={css(layoutStyles.total.raw({ hasRead }))}>
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
}
