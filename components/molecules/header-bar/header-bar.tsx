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
  onClickBack?: () => void;
  className?: string;
}

function BackButton({ onClickBack, className }: BackButtonProps) {
  return (
    <DynamicBackButton
      className={cx(leftIconStyles, className)}
      onClickBack={onClickBack}
    />
  );
}

interface LogoButtonProps {
  className?: string;
}

function LogoButton({ className }: LogoButtonProps) {
  return <DynamicLogoButton className={cx(leftIconStyles, className)} />;
}

interface TitleProps {
  children?: ReactNode;
}

function Title({ children }: TitleProps) {
  return <h3 className={titleStyles}>{children}</h3>;
}

interface RightIcons {
  children?: { icon: ReactNode; key: string | number }[];
}

function RightIcons({ children }: RightIcons) {
  return (
    <div className={layoutStyles.rightIcon}>
      {children?.map((object) => <div key={object.key}>{object.icon}</div>)}
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
    (<RightIcons />).type as FunctionComponent,
  );
  return (
    <header className={cx(layoutStyles.header, className)}>
      <div className={layoutStyles.content}>
        {backButton}
        {logoButton}
        {title}
        {rightIcons}
      </div>
    </header>
  );
}

export const HeaderBar = Object.assign(HeaderBarLayout, {
  BackButton,
  LogoButton,
  Title,
  RightIcons,
});

const layoutStyles = {
  header: css({
    position: 'sticky',
    top: 0,
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
  rightIcon: css({
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
