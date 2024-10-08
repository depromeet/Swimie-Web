import {
  Children,
  FunctionComponent,
  isValidElement,
  ReactElement,
  ReactNode,
} from 'react';

import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

interface CommonProps {
  children?: ReactNode;
  className?: string;
}

function LeftContent({ children, className }: CommonProps) {
  return (
    <div className={cx(layoutStyles.leftContent, className)}>{children}</div>
  );
}

function Title({ children, className }: CommonProps) {
  return (
    <h3 className={cx(layoutStyles.centerContent, className)}>{children}</h3>
  );
}

function CenterContent({ children, className }: CommonProps) {
  return (
    <div className={cx(layoutStyles.centerContent, className)}>{children}</div>
  );
}

interface RightContentProps extends Pick<CommonProps, 'className'> {
  children?: { component: ReactNode; key: string | number }[];
}

function RightContent({ children, className }: RightContentProps) {
  return (
    <div className={cx(layoutStyles.rightContent, className)}>
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
  innerClassName?: string;
}

function HeaderBarLayout({
  children,
  className,
  innerClassName,
}: HeaderBarProps) {
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
      <header className={cx(layoutStyles.header, innerClassName)}>
        <div className={layoutStyles.totalContent}>
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
  totalContent: css({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    w: 'full',
  }),
  leftContent: flex({
    position: 'absolute',
    alignItems: 'center',
    left: '12px',
  }),
  centerContent: flex({
    justifyContent: 'center',
    alignItems: 'center',
    w: 'full',
    textStyle: 'heading6',
    fontWeight: 500,
  }),
  rightContent: flex({
    position: 'absolute',
    right: '12px',
    gap: '24px',
  }),
};
