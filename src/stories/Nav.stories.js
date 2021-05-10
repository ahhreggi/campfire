import React from 'react';

import Nav from '../components/Nav';

export default {
  title: 'Nav-bar',
  component: Nav,
};

const Template = (args) => <Nav {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  active: true,
  viewTitle: 'Hello',
  courseName: 'March 1st 2021',
  userAvatar: 'Placeholder :-)',
  userName: 'LeetHax0r'
};