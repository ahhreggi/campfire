import React from 'react';

import Post from '../components/Post';

export default {
  title: 'Post',
  component: Post
};

const Template = (args) => <Post {...args} />;

export const TestPost = Template.bind({});

TestPost.args = {
  id: PropTypes.number,
  anonymous: PropTypes.bool,
  author: PropTypes.string,
  bestAnswer: PropTypes.number,
  body: PropTypes.string,
  bookmarked: PropTypes.bool,
  comments: PropTypes.array,
  createdAt: PropTypes.string,
  lastModified: PropTypes.string,
  editable: PropTypes.bool,
  tags: PropTypes.array,
  title: PropTypes.string,
  userID: PropTypes.number,
  views: PropTypes.number,
  onEditPost: PropTypes.func,
  onEditComment: PropTypes.func
};