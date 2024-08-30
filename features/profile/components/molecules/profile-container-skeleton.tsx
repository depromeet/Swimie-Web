import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

export function ProfileContainerSkeleton() {
  // TODO: 리팩토링 예정
  return (
    <>
      <div className={profileContainerStyles}>
        <div className={profileStyles}>
          <div className={imgSteyles} />
          <div className={introductionContainerStyles}>
            <div className={nameStyles} />
            <div className={introStyles} />
          </div>
        </div>
        <div className={followerFollowingContainerStyles}>
          <div className={followerFollowingWrapperStyles}>
            <div className={followerFollowingStyles}></div>
            <div className={followerFollowingStyles}></div>
          </div>
          <div className={followerFollowingWrapperStyles}>
            <div className={followerFollowingStyles}></div>
            <div className={followerFollowingStyles}></div>
          </div>
        </div>
        <div className={followerFollowingButton} />
      </div>
      <div className={tabContainserStyles}>
        <div className={tabItemStyles}>
          <div className={tabStyles} />
        </div>
        <div className={tabItemStyles}>
          <div className={tabStyles} />
        </div>
        <div className={tabItemStyles}>
          <div className={tabStyles} />
        </div>
      </div>
      <div className={contentContainer}>
        {/* NOTE: 임시 주석 */}
        {/* <div className={contentTextStyles}>기록을 불러오고 있어요</div> */}
        <div className={contentImgStyles} />
      </div>
    </>
  );
}

const profileContainerStyles = flex({
  width: '100%',
  padding: '16px 20px',
  direction: 'column',
  alignItems: 'flex-start',
  gap: '20px',
});

const profileStyles = flex({
  alignItems: 'flex-start',
  gap: '21px',
});

const imgSteyles = css({
  width: '60px',
  height: '60px',
  flexShrink: '0',
  borderRadius: '999px',
  animation: 'skeleton 1.5s infinite',
});

const introductionContainerStyles = flex({
  direction: 'column',
  alignItems: 'flex-start',
  gap: '4px',
  flex: '1 0 0',
});

const nameStyles = css({
  width: '80px',
  height: '30px',
  borderRadius: '4px',
  animation: 'skeleton 1.5s infinite',
});

const introStyles = css({
  width: '200px',
  height: '22px',
  borderRadius: '4px',
  animation: 'skeleton 1.5s infinite',
});

const followerFollowingContainerStyles = flex({
  alignItems: 'center',
  gap: '40px',
  alignSelf: 'stretch',
});

const followerFollowingWrapperStyles = flex({
  width: '35px',
  direction: 'column',
  alignItems: 'flex-start',
  gap: '2px',
});

const followerFollowingStyles = css({
  width: '35px',
  height: '18px',
  borderRadius: '4px',
  animation: 'skeleton 1.5s infinite',
});

const followerFollowingButton = css({
  height: '32px',
  alignSelf: 'stretch',
  borderRadius: '4px',
  animation: 'skeleton 1.5s infinite',
});

const tabContainserStyles = flex({
  padding: '0 20px',
  alignItems: 'center',
  borderBottom: '1px solid',
  borderColor: 'line.neutral',
});

const tabItemStyles = flex({
  padding: '16px 10px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  flex: '1 0 0',
});

const tabStyles = css({
  width: '30px',
  height: '24px',
  borderRadius: '4px',
  animation: 'skeleton 1.5s infinite',
});

const contentContainer = flex({
  direction: 'column',
  alignItems: 'center',
  gap: '12px',
  paddingTop: '80px',
  width: '100%',
});

// const contentTextStyles = css({
//   alignSelf: 'stretch',
//   textAlign: 'center',
//   color: 'text.normal',
//   textStyle: 'body2.normal',
// });

const contentImgStyles = css({
  width: '60px',
  height: '60px',
  animation: 'skeleton 1.5s infinite',
});
