import dynamic from 'next/dynamic';
import {
  Children,
  FunctionComponent,
  isValidElement,
  ReactElement,
  ReactNode,
} from 'react';

import { LeftArrowIcon, LogoIcon } from '@/components/atoms';
import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

const DynamicBackButton = dynamic(
  () => import('./header-back-button').then(({ BackButton }) => BackButton),
  {
    ssr: false,
    loading: () => (
      <div className={cx(leftIconStyles)}>
        <LeftArrowIcon />
      </div>
    ),
  },
);
const DynamicLogoButton = dynamic(
  () => import('./header-logo-button').then(({ LogoButton }) => LogoButton),
  {
    ssr: false,
    loading: () => (
      <div className={cx(leftIconStyles)}>
        <LogoIcon />
      </div>
    ),
  },
);

interface BackButtonProps {
  onClick?: () => void;
  className?: string;
}

function BackButton({ onClick, className }: BackButtonProps) {
  return (
    <DynamicBackButton
      className={cx(leftIconStyles, className)}
      onClickBack={onClick}
    />
  );
}

interface LogoButtonProps {
  onClick?: () => void;
  className?: string;
}

function LogoButton({ onClick, className }: LogoButtonProps) {
  return (
    <DynamicLogoButton
      className={cx(leftIconStyles, className)}
      onClickLogo={onClick}
    />
  );
}

interface TitleProps {
  children?: ReactNode;
  className?: string;
}

function Title({ children, className }: TitleProps) {
  return <h3 className={cx(titleStyles, className)}>{children}</h3>;
}

interface RightContentProps {
  children?: { component: ReactNode; key: string | number }[];
  className?: string;
}

function RightContent({ children, className }: RightContentProps) {
  return (
    <div className={cx(layoutStyles.rightIcon, className)}>
      {children?.map((object) => (
        <div key={object.key}>{object.component}</div>
      ))}
    </div>
  );
}

const getChildrenArray = (
  children: ReactNode,
  slice: number,
  type: FunctionComponent,
) => {
  const childrenArray = Children.toArray(children);
  return childrenArray
    .filter(
      (child): child is ReactElement =>
        isValidElement(child) && child.type === type,
    )
    .slice(0, slice);
};

interface HeaderBarProps {
  children?: ReactNode;
  className?: string;
}

function HeaderBarLayout({ children, className }: HeaderBarProps) {
  const backButton = getChildrenArray(
    children,
    1,
    (<BackButton />).type as FunctionComponent,
  );
  const logoButton = getChildrenArray(
    children,
    1,
    (<LogoButton />).type as FunctionComponent,
  );
  const title = getChildrenArray(
    children,
    1,
    (<Title />).type as FunctionComponent,
  );
  const rightIcons = getChildrenArray(
    children,
    2,
    (<RightContent />).type as FunctionComponent,
  );
  return (
    <>
      <div style={{ height: '44px' }} className={className} />
      <header className={layoutStyles.header}>
        <div className={layoutStyles.content}>
          {backButton}
          {logoButton}
          {title}
          {rightIcons}
        </div>
      </header>
    </>
  );
}

export const HeaderBar = Object.assign(HeaderBarLayout, {
  BackButton,
  LogoButton,
  Title,
  RightContent,
});

const layoutStyles = {
  header: css({
    position: 'fixed',
    top: 0,
    w: 'full',
    display: 'flex',
    alignItems: 'center',
    minHeight: '44px',
    backgroundColor: 'white',
    zIndex: 200,
  }),
  content: css({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    w: 'full',
  }),
  rightIcon: flex({
    position: 'absolute',
    right: '12px',
    gap: '24px',
  }),
};

const leftIconStyles = css({
  position: 'absolute',
  left: '12px',
});

const titleStyles = flex({
  justifyContent: 'center',
  alignItems: 'center',
  w: 'full',
  textStyle: 'heading6',
  fontWeight: 500,
});
