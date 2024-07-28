import { useSetAtom } from 'jotai';
import { useFormContext } from 'react-hook-form';

import { StarIcon, StarIconFill } from '@/components/atoms';
import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { isPoolSearchPageModalOpen } from '../../store';

interface PoolSearchListElementProps {
  poolId: number;
  name: string;
  address: string;
  isFavorite: boolean;
  className?: string;
}

export function PoolSearchResultElement({
  poolId,
  name,
  address,
  isFavorite,
  className,
}: PoolSearchListElementProps) {
  const { setValue } = useFormContext();
  const setIsPoolSearchPageModalOpen = useSetAtom(isPoolSearchPageModalOpen);

  const handleElementClick = (name: string, poolId: number) => {
    setValue('poolId', poolId);
    setValue('poolName', name);
    setIsPoolSearchPageModalOpen({ isOpen: false, jumpDirection: 'backward' });
  };
  return (
    <li
      className={cx(listStyles, className)}
      onClick={() => handleElementClick(name, poolId)}
    >
      <div className={textStyles.layout}>
        <span className={textStyles.name}>{name}</span>
        <span className={textStyles.address}>{address}</span>
      </div>
      {isFavorite ? <StarIconFill /> : <StarIcon />}
    </li>
  );
}

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
  }),
};
