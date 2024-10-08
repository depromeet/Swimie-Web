'use client';

import '../../features/on-boarding/steps.css';

import Link from 'next/link';
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
import { css } from '@/styled-system/css';

export default function OnBoarding() {
  const { step, handlers } = useProgressIndicator();
  return (
    <div className={layoutStyles.total}>
      <HeaderBar
        className={css({
          marginBottom: '43px',
        })}
        innerClassName={css({ backgroundColor: 'background.gray!' })}
      >
        <HeaderBar.LeftContent>
          <BackButton />
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
          <Steps current={step} />
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
