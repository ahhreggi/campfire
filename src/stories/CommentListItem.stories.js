import React from 'react';

import CommentListItem from '../components/CommentListItem';

export default {
  title: 'CommentListItem',
  component: CommentListItem,
  argTypes: { onClick: { action: 'Clicked' }, props: { onEdit: {action: 'Saved!' }}}
};

const Template = (args) => <CommentListItem {...args} />;

export const Primary = Template.bind ({});
Primary.storyname = 'No replies, non-anonymous'
Primary.args = {
  id: 1,
  anonymous: false,
  author: "Ben Scrivens",
  body: "Hello friends! Does anyone have any idea why my code keeps breaking?",
  createdAt: Date.now(),
  lastModified: Date.now(),
  editable: false,
  endorsable: false,
  endorsements: [],
  replies: []
};

export const Secondary = Template.bind ({});
Secondary.storyname = 'No replies, anonymous'

Secondary.args = {
  ...Primary.args,
  anonymous: true,
  author: "Billy Jean",
  body: "Have you tried using Vue instead?",
  editable: true,
  endorsable: true,
};

export const Third = Template.bind ({});
Third.storyname = 'Comment with replies'

Third.args = {
  ...Primary.args,
  replies:
  [
    {...Secondary.args},
    {...Secondary.args, body: "Actually that'd be a bad idea nvm"}
  ]
};