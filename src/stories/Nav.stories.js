import React from 'react';

import Nav from '../components/Nav';
import '../index.scss';

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
  userAvatar: '../src/images/avatars/2.png',
  userName: 'LeetHax0r'
};