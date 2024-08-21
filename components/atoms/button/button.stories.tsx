import type { Meta, StoryObj } from '@storybook/react';

import { css } from '@/styled-system/css';

import BadgeIcon from '../icons/badge-icon';
import StatisticsIcon from '../icons/statistics-icon';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'Example/Button',
  component: Button,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className={css({ m: 10 })}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: { type: 'select', options: ['small', 'medium', 'large'] },
    },
    disabled: {
      control: 'boolean',
    },
    variant: {
      control: { type: 'select', options: ['solid', 'outlined', 'text'] },
    },
    buttonType: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'assistive'],
      },
    },
    interaction: {
      control: {
        type: 'select',
        options: ['normal', 'hovered', 'focused', 'pressed'],
      },
    },
    label: {
      control: 'text',
    },
    leftIconSrc: {
      control: 'object',
      table: {
        disable: true,
      },
    },
    rightIconSrc: {
      control: 'object',
      table: {
        disable: true,
      },
    },
    className: {
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    label: 'Label',
    size: 'large',
    interaction: 'normal',
  },
};

export const outlined: Story = {
  args: {
    ...Default.args,
    variant: 'outlined',
  },
};

export const text: Story = {
  args: {
    ...Default.args,
    variant: 'text',
  },
};

export const leftIcon: Story = {
  args: {
    ...Default.args,
    leftIconSrc: <BadgeIcon />,
  },
};

export const rightIcon: Story = {
  args: {
    ...Default.args,
    rightIconSrc: <StatisticsIcon />,
  },
};

export const bothIcon: Story = {
  args: {
    ...Default.args,
    leftIconSrc: <BadgeIcon />,
    rightIconSrc: <StatisticsIcon />,
  },
};
