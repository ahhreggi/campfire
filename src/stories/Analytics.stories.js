import React from 'react';

import Analytics from '../components/Analytics';

export default {
  title: 'Analytics',
  component: Analytics
};

const Template = (args) => <Analytics {...args} />;

export const TestComponent = Template.bind ({});

TestComponent.args = {

};