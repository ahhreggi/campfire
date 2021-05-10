import React from 'react';

import Button from '../components/Button';

export default {
  title: 'Button',
  component: Button,
  argTypes: { onClick: { action: 'Clicked' }}
};

const Template = (args) => <Button {...args} text='Click Me!' disabled={false} />;

export const FormGreen = Template.bind ({});

FormGreen.args = {
  styles: "form green",
};

export const FormRed = Template.bind ({});

FormRed.args = {
  styles: "form red",
};

export const FormGreenDisabled = Template.bind ({});

FormGreenDisabled.args = {
  styles: "form green",
  disabled: true
};

export const FormRedDisabled = Template.bind ({});

FormRedDisabled.args = {
  styles: "form red",
  disabled: true
};

export const Tag = Template.bind ({});

Tag.args = {
  styles: "tag",
};

export const TagSelected = Template.bind ({});

TagSelected.args = {
  styles: "tag selected",
};

export const TagFilter = Template.bind ({});

TagFilter.args = {
  styles: "tag filter",
};

export const TagClear = Template.bind ({});

TagClear.args = {
  styles: "tag clear",
};

export const TagDisabled = Template.bind ({});

TagDisabled.args = {
  styles: "tag",
  disabled: true
};

