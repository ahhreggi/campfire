import React from 'react';

import CommentList from '../components/CommentList';

export default {
  title: 'CommentList',
  component: CommentList
};

const Template = (args) => <CommentList {...args} />;

export const TestComponent = Template.bind ({});

TestComponent.args = {

};