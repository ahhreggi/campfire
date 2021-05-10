import React from 'react';

import TagList from '../components/TagList';

export default {
  title: 'TagList',
  component: TagList
};

const Template = (args) => <TagList {...args} />;

export const TestComponent = Template.bind ({});

TestComponent.args = {

};