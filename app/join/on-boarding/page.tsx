'use client';

import { Button } from '@/components/atoms';
import { BackButton, HeaderBar } from '@/components/molecules';
import {
  ProgressIndicator,
  SkipButton,
  useProgressIndicator,
} from '@/features/on-boarding';
import { css } from '@/styled-system/css';

export default function OnBoarding() {
  const { step, handlers } = useProgressIndicator();
  return (
    <>
      <HeaderBar>
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
      <div className={layout.button}>
        <Button
          buttonType="secondary"
          variant="outlined"
          size="large"
          label="다음"
          interaction="normal"
          onClick={() => handlers.next()}
          className={css({ w: 'full' })}
        />
      </div>
    </>
  );
}

const layout = {
  button: css({
    w: 'full',
    position: 'absolute',
    bottom: 'calc(15px + env(safe-area-inset-bottom))',
    padding: '0 20px',
  }),
};
