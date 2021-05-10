import React from 'react';

import PostListItem from '../components/PostListItem';

export default {
  title: 'PostListItem',
  component: PostListItem,
  argTypes: { onClick: { action: 'Clicked' }},
  decorators: [(Story) => <div style={{ width: '20rem'}}><Story/></div>]
};

const Template = (args) => <PostListItem {...args} />;

export const Primary = Template.bind ({});

Primary.args = {
  title: "How fix code? :(",
  body: "My code is broken and I just don't know what to doooo",
  tags: [{
    "id": 3,
    "name": "Promises"
  },
  {
    "id": 4,
    "name": "Classes"
  }],
  views: 0,
  comments: 0,
  showStudentBadge: true
};

export const Pinned = Template.bind ({});

Pinned.args = {
  title: "Super important announcement",
  body: "Starting tomorrow we are going to write better unit tests",
  tags: [{
    "id": 3,
    "name": "Promises"
  }],
  pinned: true,
  views: 250,
  comments: 20,
  showInstructorBadge: true
};

export const Bookmarked = Template.bind ({});

Bookmarked.args = {
  title: "Confused about callbacks",
  body: "Can somebody please explain what the event loop even is because I just feel like I'm going in circles",
  tags: [{
    "id": 3,
    "name": "Promises"
  }],
  bookmarked: true,
  bestAnswer: 2,
  views: 33,
  comments: 2,
  showStudentBadge: true,
  showInstructorBadge: true
};
