'use client';

import { useSetAtom } from 'jotai';
import { forwardRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { StarIcon, StarIconFill } from '@/components/atoms';
import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { useToggleFavorite } from '../../apis/use-toggle-favorite';
import { isPoolSearchPageModalOpen } from '../../store';
import { formSubInfoState } from '../../store/form-sub-info';

interface PoolSearchListElementProps {
  poolId: number;
  name: string;
  address: string;
  isFavorite: boolean;
  className?: string;
  assignRef?: boolean;
}

export const PoolSearchResultElement = forwardRef<
  HTMLLIElement,
  PoolSearchListElementProps
>(({ poolId, name, address, isFavorite, className, assignRef }, ref) => {
  const [favorite, setFavorite] = useState(isFavorite);

  const { setValue } = useFormContext();
  const setIsPoolSearchPageModalOpen = useSetAtom(isPoolSearchPageModalOpen);
  const setFormSubInfo = useSetAtom(formSubInfoState);

  const { mutate: toggleFavorite, isPending } = useToggleFavorite();

  const handleElementClick = (name: string, poolId: number) => {
    setValue('poolId', poolId);
    setFormSubInfo((prev) => ({ ...prev, poolName: name }));
    setIsPoolSearchPageModalOpen({ isOpen: false, jumpDirection: 'backward' });
  };

  const handleStarIconClick = () => {
    toggleFavorite(poolId);
    if (!isPending) setFavorite((prev) => !prev);
  };

  return (
    <li ref={assignRef ? ref : undefined} className={cx(listStyles, className)}>
      <div
        className={textStyles.layout}
        onClick={() => handleElementClick(name, poolId)}
      >
        <span className={textStyles.name}>{name}</span>
        <span className={textStyles.address}>{address}</span>
      </div>
      {favorite ? (
        <StarIconFill onClick={handleStarIconClick} />
      ) : (
        <StarIcon onClick={handleStarIconClick} />
      )}
    </li>
  );
});

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
