import React, { forwardRef } from 'react';

import { Button } from '@/components/atoms';
import { UserImageIcon } from '@/components/atoms/icons/user-image-icon';
import { css, cva } from '@/styled-system/css';
import { convertTimeToElapsedTime } from '@/utils';

import { NotificationElementProps } from '../../apis';
import { CheerUpIcon } from '../atoms';

//Todo: 추후 알림 내용이 추가될 때 props가 너무 많아질 시, 합성 컴포넌트 도입 고려
//Todo: 팔로우 api 연결
//Todo: 응원 종류 constants로 한번에 관리(응원 보내기 기능에서도 사용)
export const NotificationElement = forwardRef<
  HTMLLIElement,
  NotificationElementProps
>(
  (
    {
      type,
      notificationId,
      nickname,
      profileImageUrl,
      memberId,
      content,
      createdAt,
      hasRead,
    },
    ref,
  ) => {
    console.log(notificationId, profileImageUrl, memberId);
    return (
      <li ref={ref} className={css(layoutStyles.total.raw({ hasRead }))}>
        {type === 'FOLLOW' || type === 'FRIEND' ? (
          <UserImageIcon width={40} height={40} />
        ) : (
          <CheerUpIcon />
        )}
        <div className={css(layoutStyles.text.raw({ type }))}>
          {type === 'FRIEND' && (
            <p className={textStyles.main}>
              <span className={textStyles.userName}>{nickname}</span>님과 친구가
              되었어요!
            </p>
          )}
          {type === 'FOLLOW' && (
            <p className={textStyles.main}>
              <span className={textStyles.userName}>{nickname}</span>님을
              아시나요? <span className={textStyles.userName}>{nickname}</span>
              님이 나를 팔로우했어요.
            </p>
          )}
          {type === 'CHEER' && (
            <>
              <p>
                {createdAt} 기록에{' '}
                <span className={textStyles.userName}>{nickname}</span>님이
                응원을 남겼어요.
              </p>
              <p className={textStyles.description}>{`"${content} "`}</p>
            </>
          )}
          <span className={textStyles.time}>
            {convertTimeToElapsedTime(createdAt)}
          </span>
        </div>
        {type === 'FOLLOW' && (
          <Button
            label="팔로우"
            size="small"
            variant="outlined"
            buttonType="primary"
            className={layoutStyles.button}
          />
        )}
      </li>
    );
  },
);

NotificationElement.displayName = 'NotificationElement';

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
