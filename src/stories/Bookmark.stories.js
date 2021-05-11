import React from 'react';

import Bookmark from '../components/Bookmark';

export default {
  title: 'Bookmark',
  component: Bookmark
};

const Template = (args) => <Bookmark {...args} />;

export const Primary = Template.bind ({});
Primary.storyName = "Not Bookmarked"

Primary.args = {
  bookmarked: false
};

export const Secondary = Template.bind ({});
Secondary.storyName = "Bookmarked"

Secondary.args = {
  bookmarked: true
};