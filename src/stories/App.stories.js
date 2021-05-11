import React from 'react';

import App from '../components/App';

export default {
  title: 'App',
  component: App
};

const Template = (args) => <App {...args} />;

export const TestComponent = Template.bind ({});

TestComponent.args = {

};