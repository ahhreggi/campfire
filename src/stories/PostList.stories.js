import React from 'react';

import PostList from '../components/PostList';

export default {
  title: 'PostList',
  component: PostList
};

const Template = (args) => <PostList {...args} />;

export const TestComponent = Template.bind ({});

TestComponent.args = {

};