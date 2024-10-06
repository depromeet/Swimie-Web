'use client';

import Link from 'next/link';

import { Button } from '@/components/atoms';
import { BackButton, HeaderBar } from '@/components/molecules';
import {
  ProgressIndicator,
  SkipButton,
  Steps,
  useProgressIndicator,
} from '@/features/on-boarding';
import { OnBoardingImages } from '@/public/images/on-boarding';
import { css } from '@/styled-system/css';

export default function OnBoarding() {
  const { step, handlers } = useProgressIndicator();
  return (
    <div className={layout.page}>
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
      <Steps current={step} />
      <div className={layout.button}>
        {step < OnBoardingImages.length - 1 ? (
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

const layout = {
  page: css({
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'background.gray',
    height: '100dvh',
  }),
  button: css({
    w: 'full',
    maxWidth: 'maxWidth',
    position: 'absolute',
    bottom: 'calc(15px + env(safe-area-inset-bottom))',
    padding: '0 20px',
  }),
};
