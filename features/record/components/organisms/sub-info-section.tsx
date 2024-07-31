'use client';

import { DownArrowIcon } from '@/components/atoms';
import { Divider } from '@/components/atoms/divider';
import { css } from '@/styled-system/css';

import { useSubInfoTextFields } from '../../hooks';
import { FormSectionProps } from '../../types/form-section';
import { SubInfoTextFields } from './sub-info-text-fields';

export function SubInfoSection({ title }: FormSectionProps) {
  const { isOpen, handlers } = useSubInfoTextFields();

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
