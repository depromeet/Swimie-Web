import type { Meta, StoryObj } from '@storybook/react';

import { css } from '@/styled-system/css';

import { Dialog, DialogProps } from './dialog';

const meta: Meta<typeof Dialog> = {
  title: 'Example/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className={css({ minHeight: 500 })}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    isOpen: { control: 'boolean' },
    title: { control: 'text' },
    description: { control: 'text' },
    isDim: { control: 'boolean' },
    buttons: {
      control: 'object',
    },
  },
};

export default meta;

type Story = StoryObj<DialogProps>;

const defaultArgs = {
  isOpen: true,
  title: '타이틀 테스트',
  buttons: {
    confirm: { text: '확인', onClick: () => alert('확인 클릭') },
    cancel: { text: '취소', onClick: () => alert('취소 클릭') },
  },
};

export const Default: Story = {
  args: {
    description: '여기에는 설명이 들어갑니다.',
    isDim: true,
    ...defaultArgs,
  },
};

export const WithNoDescription: Story = {
  args: {
    isDim: true,
    ...defaultArgs,
  },
};

export const WithoutDim: Story = {
  args: {
    description: '여기에는 설명이 들어갑니다.',
    isDim: false,
    ...defaultArgs,
  },
};
