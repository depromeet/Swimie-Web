import type { Meta, StoryObj } from '@storybook/react';

import { css } from '@/styled-system/css';

import { BottomSheet, BottomSheetProps } from './bottom-sheet';

const meta: Meta<typeof BottomSheet> = {
  title: 'Example/BottomSheet',
  component: BottomSheet,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className={css({ minHeight: 500 })}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    header: {
      control: {
        type: 'object',
      },
    },
    isOpen: {
      control: 'boolean',
    },
    isRenderHandlebar: {
      control: 'boolean',
    },
    direction: {
      control: {
        type: 'select',
        options: ['top', 'bottom'],
      },
    },
  },
};

export default meta;

type Story = StoryObj<BottomSheetProps>;

const defaultArgs = {
  children: <div>children area</div>,
  isOpen: true,
};

export const Default: Story = {
  args: {
    header: {
      title: '타이틀 테스트',
      description: '여기에는 설명이 들어갑니다.',
    },
    isRenderHandlebar: true,
    direction: 'bottom',
    ...defaultArgs,
  },
};

export const WithNoHeader: Story = {
  args: {
    isRenderHandlebar: false,
    direction: 'bottom',
    ...defaultArgs,
  },
};

export const WithNoHandleBar: Story = {
  args: {
    header: {
      title: '타이틀 테스트',
      description: '여기에는 설명이 들어갑니다.',
    },
    isRenderHandlebar: false,
    direction: 'bottom',
    ...defaultArgs,
  },
};

export const TopDirection: Story = {
  args: {
    header: {
      title: '탑시트 타이틀',
      description: '여기에는 설명이 들어갑니다.',
    },
    isRenderHandlebar: true,
    direction: 'top',
    ...defaultArgs,
  },
};
