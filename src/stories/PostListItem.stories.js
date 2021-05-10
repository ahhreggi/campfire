import React from 'react';

import PostListItem from '../components/PostListItem';

export default {
  title: 'PostListItem',
  component: PostListItem
};

const Template = (args) => <PostListItem {...args} />;

export const TestComponent = Template.bind ({});

TestComponent.args = {

};