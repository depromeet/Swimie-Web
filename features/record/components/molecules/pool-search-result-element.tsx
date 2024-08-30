'use client';

import { useSetAtom } from 'jotai';
import { forwardRef, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { StarIcon, StarIconFill } from '@/components/atoms';
import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { useToggleFavorite } from '../../apis/use-toggle-favorite';
import { isPoolSearchPageModalOpen } from '../../store';
import { highlightText } from '../../utils';

interface PoolSearchListElementProps {
  poolId: number;
  poolSearchText?: string;
  name: string;
  address: string;
  isFavorite: boolean;
  className?: string;
  assignRef?: boolean;
}

export const PoolSearchResultElement = forwardRef<
  HTMLLIElement,
  PoolSearchListElementProps
>(
  (
    { poolId, poolSearchText, name, address, isFavorite, className, assignRef },
    ref,
  ) => {
    const [favorite, setFavorite] = useState(isFavorite);

    const { setValue } = useFormContext();
    const setIsPoolSearchPageModalOpen = useSetAtom(isPoolSearchPageModalOpen);

    const { mutate: toggleFavorite, isPending } = useToggleFavorite();

    const handleElementClick = (name: string, poolId: number) => {
      setValue('poolId', poolId);
      setValue('poolName', name);
      setIsPoolSearchPageModalOpen({
        isOpen: false,
        jumpDirection: 'backward',
      });
      const currentUrl = new URL(window.location.href);
      const newUrl = `${currentUrl.pathname}${currentUrl.search}`;
      window.history.replaceState(null, '', newUrl);
    };

    const handleStarIconClick = () => {
      toggleFavorite(poolId);
      if (!isPending) setFavorite((prev) => !prev);
    };

    useEffect(() => {
      if (favorite !== isFavorite) {
        setFavorite(isFavorite);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFavorite]);

    return (
      <li
        ref={assignRef ? ref : undefined}
        className={cx(listStyles, className)}
      >
        <div
          className={textStyles.layout}
          onClick={() => handleElementClick(name, poolId)}
        >
          <span className={textStyles.name}>
            {highlightText(name, poolSearchText)}
          </span>
          <span className={textStyles.address}>{address}</span>
        </div>
        {favorite ? (
          <StarIconFill onClick={handleStarIconClick} />
        ) : (
          <StarIcon onClick={handleStarIconClick} />
        )}
      </li>
    );
  },
);

const listStyles = flex({
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px 0px',
  marginBottom: '8px',
});

const textStyles = {
  layout: flex({
    direction: 'column',
    justifyContent: 'space-between',
    maxWidth: '85%',
    wordBreak: 'keep-all',
  }),
  name: css({
    textStyle: 'heading6',
    fontWeight: 600,
    color: 'text.normal',
  }),
  address: css({
    textStyle: 'body2.normal',
    fontWeight: 400,
    color: 'text.alternative',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }),
};

PoolSearchResultElement.displayName = 'PoolSearchResultElement';
