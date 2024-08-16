import { ProfileEditForm } from '@/features/profile';
import { css } from '@/styled-system/css';

//Todo: api 연결
export default function ProfileEditPage() {
  return (
    <div className={layoutStyles}>
      {/* Todo: header-bar 머지 후 연결 */}
      프로필 편집 페이지
      <ProfileEditForm />
    </div>
  );
}

const layoutStyles = css({
  padding: '0 20px',
});
