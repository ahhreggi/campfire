import React from 'react';

import Button from '../components/Button';

export default {
  title: 'Button',
  component: Button
};

const Template = (args) => <Button {...args} />;

export const TestComponent = Template.bind ({});

TestComponent.args = {

};