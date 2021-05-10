import React from 'react';

import Button from '../components/Button';

export default {
  title: 'Button',
  component: Button,
  argTypes: { onClick: { action: 'Clicked' }}
};

const Template = (args) => <Button {...args} />;

export const FormGreen = Template.bind ({});

FormGreen.args = {
  text: "Click me!",
  styles: "form green",
  disabled: false
};

export const FormRed = Template.bind ({});

FormRed.args = {
  text: "Click me!",
  styles: "form red",
  disabled: false
};

export const FormGreenDisabled = Template.bind ({});

FormGreenDisabled.args = {
  text: "Click me!",
  styles: "form green",
  disabled: true
};

export const FormRedDisabled = Template.bind ({});

FormRedDisabled.args = {
  text: "Click me!",
  styles: "form red",
  disabled: true
};

export const Tag = Template.bind ({});

Tag.args = {
  text: "PROMISES",
  styles: "tag",
  disabled: false
};

export const TagSelected = Template.bind ({});

TagSelected.args = {
  text: "PROMISES",
  styles: "tag selected",
  disabled: false
};

export const TagFilter = Template.bind ({});

TagFilter.args = {
  text: "PROMISES",
  styles: "tag filter",
  disabled: false
};

export const TagClear = Template.bind ({});

TagClear.args = {
  text: "PROMISES",
  styles: "tag clear",
  disabled: false
};

export const TagDisabled = Template.bind ({});

TagDisabled.args = {
  text: "PROMISES",
  styles: "tag",
  disabled: true
};

