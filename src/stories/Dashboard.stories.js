import React from 'react';

import Dashboard from '../components/Dashboard';

export default {
  title: 'Dashboard',
  component: Dashboard
};

const Template = (args) => <Dashboard {...args} />;

export const TestComponent = Template.bind ({});

TestComponent.args = {

};