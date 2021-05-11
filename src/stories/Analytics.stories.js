import React from 'react';

import Analytics from '../components/Analytics';

export default {
  title: 'Analytics',
  component: Analytics,
  decorators: [(Story) => <div style={{ 'margin-left': '20rem'}}><Story/></div>]
};

const Template = (args) => <Analytics {...args} />;

export const TestComponent = Template.bind ({});

TestComponent.args = {

};