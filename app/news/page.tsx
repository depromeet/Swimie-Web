import { GlobalNavigationBar, HeaderBar } from '@/components/molecules';
import { FollowingListLinkButton, NewsList } from '@/features/news';
import { FindMemberButton } from '@/features/news/components/atoms/find-member-button';
import { css } from '@/styled-system/css';

export default function NewsPage() {
  return (
    <>
      <HeaderBar>
        <HeaderBar.LeftContent>
          <FollowingListLinkButton />
        </HeaderBar.LeftContent>
        <HeaderBar.RightContent>
          {[{ component: <FindMemberButton />, key: 'findMember' }]}
        </HeaderBar.RightContent>
      </HeaderBar>

      <section className={sectionStyle}>
        <NewsList />
      </section>

      <GlobalNavigationBar />
    </>
  );
}

const sectionStyle = css({
  px: '20px',
});
