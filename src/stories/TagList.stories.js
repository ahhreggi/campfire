import React from 'react';

import TagList from '../components/TagList';

const tags = [
  {
    "id": 1,
    "name": "Callbacks"
  },
  {
    "id": 2,
    "name": "Closures"
  },
  {
    "id": 3,
    "name": "Promises"
  },
  {
    "id": 4,
    "name": "Classes"
  },
  {
    "id": 5,
    "name": "Async"
  },
  {
    "id": 6,
    "name": "HTML"
  }
]

export default {
  title: 'TagList',
  component: TagList,
  decorators: [(Story) => <div style={{ width: '20rem'}}><Story/></div>]
};

const Template = (args) => <TagList {...args} />;

export const Primary = Template.bind ({});
Primary.storyName = 'None selected'

Primary.args = {
  tags,
  selectedTags: []
};

export const Secondary = Template.bind ({});
Secondary.storyName = 'One tag selected'

Secondary.args = {
  tags,
  selectedTags: [tags[3]]
};

export const Tertiary = Template.bind ({});
Tertiary.storyName = 'Multiple tags selected'

Tertiary.args = {
  tags,
  selectedTags: [tags[0], tags[1], tags[4]]
};