import { Button } from '@/components/atoms';
import { css } from '@/styled-system/css';

export default function FollowButton() {
  return (
    <Button
      size="small"
      label="팔로우"
      variant="solid"
      buttonType="primary"
      className={css({ width: '100%' })}
    />
  );
}
