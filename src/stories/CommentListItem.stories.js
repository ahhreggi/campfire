import React from 'react';

import CommentListItem from '../components/CommentListItem';

export default {
  title: 'CommentListItem',
  component: CommentListItem
};

const Template = (args) => <CommentListItem {...args} />;

export const TestComponent = Template.bind ({});

TestComponent.args = {

};