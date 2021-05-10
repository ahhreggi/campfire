import React from 'react';

import CommentList from '../components/CommentList';
import * as CommentListItemStories from './CommentListItem.stories';

export default {
  title: 'CommentList',
  component: CommentList
};

const Template = (args) => <CommentList {...args} />;

export const TestCommentList = Template.bind ({});

TestCommentList.args = {
  comments:[
    {...CommentListItemStories.Primary.args},
    {...CommentListItemStories.Secondary.args},
    {...CommentListItemStories.Third.args}
  ]
};