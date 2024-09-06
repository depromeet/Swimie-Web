import { HeaderBar, SettingButton } from '@/components/molecules';
import { css } from '@/styled-system/css';

export function MyPageHeader() {
  return (
    <HeaderBar>
      <HeaderBar.RightContent className={css({ right: '20px' })}>
        {[{ component: <SettingButton />, key: 'setting' }]}
      </HeaderBar.RightContent>
    </HeaderBar>
  );
}
