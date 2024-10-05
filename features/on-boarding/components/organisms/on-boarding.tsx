import { BackButton, HeaderBar } from '@/components/molecules';

import { SkipButton } from '../atoms';
import { ProgressIndicator } from '../molecules/progress-indicator';

export function OnBoarding() {
  return (
    <>
      <HeaderBar>
        <HeaderBar.LeftContent>
          <BackButton />
        </HeaderBar.LeftContent>
        <HeaderBar.CenterContent>
          <ProgressIndicator />
        </HeaderBar.CenterContent>
        <HeaderBar.RightContent>
          {[{ component: <SkipButton label="건너뛰기" />, key: 'skipButton' }]}
        </HeaderBar.RightContent>
      </HeaderBar>
    </>
  );
}
