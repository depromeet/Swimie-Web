'use client';

import '../../features/on-boarding/steps.css';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cloneElement, ReactElement } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { Button } from '@/components/atoms';
import { BackButton, HeaderBar } from '@/components/molecules';
import {
  ProgressIndicator,
  SkipButton,
  Steps,
  stepsIntroduce,
  useProgressIndicator,
} from '@/features/on-boarding';
import { useSwipe } from '@/hooks';
import { css } from '@/styled-system/css';

export default function OnBoarding() {
  const router = useRouter();
  const { step, handlers } = useProgressIndicator();

  const { handleTouchStart, handleTouchEnd } = useSwipe({
    onSwipeLeft: step < stepsIntroduce.length - 1 ? handlers.next : undefined,
    onSwipeRight: step > 0 ? handlers.prev : undefined,
    threshold: 20,
  });

  const handleBackButtonClick = () => {
    if (step > 0) handlers.prev();
    else router.back();
  };

  return (
    <div className={layoutStyles.total}>
      <HeaderBar
        className={css({
          marginBottom: '43px',
        })}
        innerClassName={css({ backgroundColor: 'background.gray!' })}
      >
        <HeaderBar.LeftContent>
          <BackButton onClickBack={handleBackButtonClick} />
        </HeaderBar.LeftContent>
        <HeaderBar.CenterContent>
          <ProgressIndicator step={step} />
        </HeaderBar.CenterContent>
        <HeaderBar.RightContent>
          {[
            {
              component: (
                <SkipButton label="건너뛰기" onClick={handlers.skip} />
              ),
              key: 'skipButton',
            },
          ]}
        </HeaderBar.RightContent>
      </HeaderBar>
      <TransitionGroup
        component={null}
        childFactory={(child: ReactElement) => {
          return cloneElement(child, {
            classNames: 'fade',
          });
        }}
      >
        <CSSTransition key={step} timeout={200}>
          <Steps
            current={step}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          />
        </CSSTransition>
      </TransitionGroup>
      <div className={layoutStyles.button}>
        {step < stepsIntroduce.length - 1 ? (
          <Button
            buttonType="secondary"
            variant="outlined"
            size="large"
            label="다음"
            interaction="normal"
            onClick={() => handlers.next()}
            className={css({ w: 'full' })}
          />
        ) : (
          <Link href="/">
            <Button
              buttonType="primary"
              variant="solid"
              size="large"
              label="시작하기"
              interaction="normal"
              className={css({ w: 'full' })}
            />
          </Link>
        )}
      </div>
    </div>
  );
}

const layoutStyles = {
  total: css({
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'background.gray',
    height: '100dvh',
  }),
  button: css({
    w: 'full',
    maxWidth: 'maxWidth',
    position: 'fixed',
    bottom: 'calc(15px + env(safe-area-inset-bottom))',
    padding: '0 20px',
  }),
};
