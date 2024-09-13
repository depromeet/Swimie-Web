import { HeaderBar, SettingButton } from '@/components/molecules';
import { FindMemberButton } from '@/features/news';
import { css } from '@/styled-system/css';

export function MyPageHeader() {
  return (
    <HeaderBar>
      <HeaderBar.RightContent className={css({ right: '20px', gap: '14px!' })}>
        {[
          { component: <FindMemberButton />, key: 'findMember' },
          { component: <SettingButton />, key: 'setting' },
        ]}
      </HeaderBar.RightContent>
    </HeaderBar>
  );
}
