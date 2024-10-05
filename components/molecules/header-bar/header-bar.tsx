import {
  Children,
  FunctionComponent,
  isValidElement,
  ReactElement,
  ReactNode,
} from 'react';

import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { leftIconStyles } from './style';

interface LeftContentProps {
  children?: ReactNode;
  className?: string;
}

function LeftContent({ children, className }: LeftContentProps) {
  return <div className={cx(leftIconStyles, className)}>{children}</div>;
}

interface TitleProps {
  children?: ReactNode;
  className?: string;
}

function Title({ children, className }: TitleProps) {
  return <h3 className={cx(titleStyles, className)}>{children}</h3>;
}

interface CenterContentProps {
  children?: ReactNode;
  className?: string;
}

function CenterContent({ children, className }: CenterContentProps) {
  return <div className={cx(titleStyles, className)}>{children}</div>;
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
  const leftContent = getChildrenArray(
    children,
    1,
    (<LeftContent />).type as FunctionComponent,
  );
  const centerContent = getChildrenArray(
    children,
    1,
    (<CenterContent />).type as FunctionComponent,
  );
  const title = getChildrenArray(
    children,
    1,
    (<Title />).type as FunctionComponent,
  );
  const rightContent = getChildrenArray(
    children,
    2,
    (<RightContent />).type as FunctionComponent,
  );
  return (
    <>
      <div style={{ height: '44px' }} className={className} />
      <header className={layoutStyles.header}>
        <div className={layoutStyles.content}>
          {leftContent}
          {centerContent}
          {title}
          {rightContent}
        </div>
      </header>
    </>
  );
}

export const HeaderBar = Object.assign(HeaderBarLayout, {
  LeftContent,
  Title,
  CenterContent,
  RightContent,
});

const layoutStyles = {
  header: css({
    position: 'fixed',
    top: 0,
    w: 'full',
    maxW: 'maxWidth',
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

const titleStyles = flex({
  justifyContent: 'center',
  alignItems: 'center',
  w: 'full',
  textStyle: 'heading6',
  fontWeight: 500,
});
