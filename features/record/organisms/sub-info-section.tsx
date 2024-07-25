'use client';

import { Divider, DownArrowIcon } from '@/components/atoms';
import { css } from '@/styled-system/css';

import { UseSubInfoTextFields } from '../hooks/use-sub-info-text-fields';
import { SubInfoTextFields } from './sub-info-text-fields';
import { SectionProps } from './type';

export function SubInfoSection({ title }: SectionProps) {
  const { isOpen, handlers } = UseSubInfoTextFields();

  return (
    <section>
      <div
        className={beforeExpandStyles.layout}
        onClick={() => handlers.onChangeFieldsOpen()}
      >
        <h1 className={beforeExpandStyles.title}>{title}</h1>
        <DownArrowIcon />
      </div>
      {!isOpen && <Divider variant="thick" />}
      <SubInfoTextFields isOpen={isOpen} />
    </section>
  );
}

const beforeExpandStyles = {
  layout: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px 20px',
  }),
  title: css({
    textStyle: 'heading4',
    fontWeight: '600',
  }),
};