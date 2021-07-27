import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import { isBefore, startOfToday } from 'date-fns';
import Docs from './DatePicker.mdx';
import DatePicker from './DatePicker';

import './style';

export default {
  title: 'Pickers/DatePicker',
  component: DatePicker,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GrowingIO-Design-Components?node-id=2672%3A30128',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
} as Meta;

const Template: Story = (args) => <DatePicker {...args} />;

export const Basic = Template.bind({});
Basic.args = {};

export const DisabledDate = Template.bind({});
DisabledDate.args = {
  disabledDate: (date: Date) => isBefore(startOfToday(), date),
};