import React from 'react';

import Dashboard from '../components/Dashboard';

export default {
  title: 'Dashboard',
  component: Dashboard,
  decorators: [(Story) => <div style={{ 'margin-left': '20rem'}}><Story/></div>]
};

const Template = (args) => <Dashboard {...args} />;

export const TestComponent = Template.bind ({});

TestComponent.args = {

};