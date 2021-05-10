import React from 'react';

import PostForm from '../components/PostForm';

export default {
  title: 'PostForm',
  component: PostForm
};

const Template = (args) => <PostForm {...args} />;

export const TestComponent = Template.bind ({});

TestComponent.args = {

};