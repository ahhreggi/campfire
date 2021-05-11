import React from 'react';

import CommentListItem from '../components/CommentListItem';

export default {
  title: 'CommentListItem',
  component: CommentListItem,
  argTypes: { onClick: { action: 'Clicked' }, onEdit: { action: 'Saved' }},
  decorators: [(Story) => <div style={{ 'margin-left': '20rem'}}><Story/></div>]
};

const Template = (args) => <CommentListItem {...args} />;

export const Primary = Template.bind ({});
Primary.storyName = 'No replies, non-anonymous'
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
Secondary.storyName = 'No replies, anonymous'

Secondary.args = {
  ...Primary.args,
  anonymous: true,
  author: "Billy Jean",
  body: "Have you tried using Vue instead?",
  editable: true,
  endorsable: true,
};

export const Third = Template.bind ({});
Third.storyName = 'Comment with replies'

Third.args = {
  ...Primary.args,
  replies:
  [
    {...Secondary.args, onEditComment: () => onClick()},
    {...Secondary.args, body: "Actually that'd be a bad idea nvm", onEdit: () => onClick()}
  ]
};