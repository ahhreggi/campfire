import React from 'react';

import Badge from '../components/Badge';

export default {
  title: 'Badge',
  component: Badge
};

export const Instructor = () => <Badge type="instructor" />;
export const Student = () => <Badge type="student" />;
export const Unresolved = () => <Badge type="unresolved" />;