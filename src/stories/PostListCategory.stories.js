import React from 'react';

import PostList from '../components/PostList';
import * as PostListCategoryItemStories from './PostListCategoryItem.stories';

let dummyCourseData = {
  "tags": [
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
  ],
  "posts": [
    {
      "id": 2,
      "title": "How do I create a class? 1 2 3 4 5 6 7 8",
      "body": "How do I write a new class in javascript, and declare methods, variables, etc?",
      "bookmarked": true,
      "created_at": "2021-05-08T20:00:11.570Z",
      "last_modified": "2021-05-08T20:00:12.570Z",
      "best_answer": null,
      "author_first_name": "Fiona",
      "author_last_name": "Ford",
      "author_avatar_id": null,
      "pinned": false,
      "views": 0,
      "anonymous": true,
      "role": "student",
      "user_id": 6,
      "editable": true,
      "tags": [
        {
          "id": 4,
          "name": "Classes"
        }
      ],
      "comments": [
        {
          "id": 5,
          "post_id": 2,
          "anonymous": false,
          "author_first_name": "Carson",
          "author_last_name": "Cool",
          "author_avatar_id": 1,
          "body": "You create a class with the Class keyword followed by {}",
          "score": "0",
          "created_at": "2021-05-08T20:00:11.574Z",
          "last_modified": "2021-05-08T20:00:11.574Z",
          "endorsable": true,
          "endorsements": [
            {
              id: 1,
              "endorser_id": 1,
              "endorser_name": "First Last"
            },
            {
              id: 2,
              "endorser_id": 5,
              "endorser_name": "First1 Last1"
            }
          ],
          "role": "instructor",
          "user_id": 3,
          "editable": false,
          "replies": []
        },
        {
          "id": 80,
          "post_id": 2,
          "anonymous": false,
          "author_first_name": "Carson",
          "author_last_name": "Cool",
          "author_avatar_id": 2,
          "body": "You create a class with the Class keyword followed by {}",
          "score": "0",
          "created_at": "2021-05-08T20:00:11.574Z",
          "last_modified": "2021-05-08T20:00:11.574Z",
          "endorsable": false,
          "endorsements": [
            {
              id: 2,
              "endorser_id": 1,
              "endorser_name": "First Last"
            },
            {
              id: 3,
              "endorser_id": 5,
              "endorser_name": "First1 Last1"
            }
          ],
          "role": "student",
          "user_id": 3,
          "editable": false,
          "replies": []
        }
      ]
    },
    {
      "id": 1,
      "title": "How do I use a promise?",
      "body": "I am using a new library that returns a Promise object instead of a callback... how do I act on it once its done? I am using a new library that returns a Promise object instead of a callback... how do I act on it once its done? I am using a new library that returns a Promise object instead of a callback... how do I act on it once its done? I am using a new library that returns a Promise object instead of a callback... how do I act on it once its done? ",
      "bookmarked": false,
      "created_at": "2021-05-08T20:00:11.570Z",
      "last_modified": "2021-05-08T20:00:11.570Z",
      "best_answer": 2,
      "author_first_name": "Edward",
      "author_last_name": "Ecksworth",
      "author_avatar_id": 3,
      "pinned": true,
      "views": 5,
      "anonymous": false,
      "role": "student",
      "user_id": 5,
      "editable": true,
      "tags": [
        {
          "id": 3,
          "name": "Promises"
        }
      ],
      "comments": [
        {
          "id": 2,
          "post_id": 1,
          "anonymous": false,
          "author_first_name": "Fiona",
          "author_last_name": "Ford",
          "author_avatar_id": 4,
          "body": "You can consume a promise by calling .then() on it! Be sure to use .catch() as well in case of errors.",
          "score": "3",
          "created_at": "2021-05-08T20:00:11.574Z",
          "last_modified": "2021-05-08T20:00:11.574Z",
          "endorsable": false,
          "endorsements": [
            {
              id: 1,
              "endorser_id": 1,
              "endorser_name": "First Last"
            },
            {
              id: 2,
              "endorser_id": 5,
              "endorser_name": "First1 Last1"
            }
          ],
          "role": "student",
          "user_id": 6,
          "editable": true,
          "replies": [
            {
              "id": 4,
              "parent_id": 2,
              "anonymous": false,
              "author_first_name": "Edward",
              "author_last_name": "Ecksworth",
              "author_avatar_id": 5,
              "body": "Thanks for this!!",
              "created_at": "2021-05-08T20:00:11.574Z",
              "last_modified": "2021-05-08T20:00:11.574Z",
              "endorsable": true,
              "endorsements": [
                {
                  id: 5,
                  "endorser_id": 1,
                  "endorser_name": "First Last"
                },
                {
                  id: 6,
                  "endorser_id": 5,
                  "endorser_name": "First1 Last1"
                }
              ],
              "role": "student",
              "user_id": 5,
              "editable": true
            }
          ]
        },
        {
          "id": 6,
          "post_id": 1,
          "anonymous": true,
          "author_first_name": "Aaron",
          "author_last_name": "Aldridge",
          "author_avatar_id": 6,
          "body": "Be sure to check out Promise.resolve and Promise.reject as well for more info.",
          "score": "0",
          "created_at": "2021-05-08T20:00:11.574Z",
          "last_modified": "2021-05-08T20:00:11.574Z",
          "endorsable": true,
          "endorsements": [
            {
              id: 8,
              "endorser_id": 1,
              "endorser_name": "First Last"
            },
            {
              id: 9,
              "endorser_id": 5,
              "endorser_name": "First1 Last1"
            }
          ],
          "role": "admin",
          "user_id": 1,
          "editable": false,
          "replies": []
        },
        {
          "id": 1,
          "post_id": 1,
          "anonymous": true,
          "author_first_name": "Milly",
          "author_last_name": "Monka",
          "author_avatar_id": 1,
          "body": "I had the same question!",
          "score": "0",
          "created_at": "2021-05-08T20:00:11.574Z",
          "last_modified": "2021-05-08T20:00:11.574Z",
          "endorsable": true,
          "endorsements": [
            {
              id: 10,
              "endorser_id": 1,
              "endorser_name": "First Last"
            },
            {
              id: 11,
              "endorser_id": 5,
              "endorser_name": "First1 Last1"
            }
          ],
          "role": "student",
          "user_id": 5,
          "editable": true,
          "replies": []
        }
      ]
    },
    {
      "id": 3,
      "title": "I'm not quite sure what a class is",
      "body": "Can someone define this for me? I'm grasping for definitions here without a branch to be found?",
      "bookmarked": false,
      "created_at": "2021-05-08T20:00:11.570Z",
      "last_modified": "2021-05-08T20:00:12.570Z",
      "best_answer": null,
      "author_first_name": "Fiona",
      "author_last_name": "Ford",
      "author_avatar_id": null,
      "pinned": false,
      "views": 0,
      "anonymous": true,
      "role": "student",
      "user_id": 6,
      "editable": true,
      "tags": [
        {
          "id": 4,
          "name": "Classes"
        }
      ],
      "comments": []
    }
  ]
};


export default {
  title: 'PostList',
  component: PostList,
  argTypes: { onClick: { action: 'Clicked' }},
  decorators: [(Story) => <div style={{ width: '20rem'}}><Story/></div>]
};

const Template = (args) => <PostList {...args} />;

export const Primary = Template.bind ({});
Primary.storyName = 'With Posts'

Primary.args = {
  posts: [...dummyCourseData.posts],
  tags: [...dummyCourseData.tags],
  selectedTags: []
};

export const Secondary = Template.bind ({});
Secondary.storyName = 'Without Posts'

Secondary.args = {
  posts: [],
  tags: [...dummyCourseData.tags],
  selectedTags: []
};

export const Tertiary = Template.bind ({});
Tertiary.storyName = 'Filtered by Classes Tag'

Tertiary.args = {
  posts: [...dummyCourseData.posts],
  tags: [...dummyCourseData.tags],
  selectedTags: [{
    "id": 4,
    "name": "Classes"
  }]
};