import { useState, useEffect } from "react";
import "./App.scss";
import Nav from "./Nav";
import PostList from "./PostList";
import Main from "./Main";

// Temporary data
const dummyPosts = [
  {
    "id": 1,
    "title": "How do I italicize text in HTML?",
    "body": "I'm trying to italicize text but can't figure out how. Any ideas? I'm trying to italicize text but can't figure out how. Any ideas?",
    "bookmarked": true,
    "created_at": "1620365282",
    "last_modified": "1620365282",
    "best_answer": null,
    "author_name": "FirstName LastName",
    "tags": [
      {
        "id": 5,
        "name": "stretch"
      }
    ],
    "pinned": false,
    "views": 9,
    "comments": [
      {
        "id": 1,
        "anonymous": false,
        "author_name": "Willy Wonka",
        "author_avatar_url": "avatar.png",
        "author_permissions": 0,
        "body": "Try <i>text</i>.",
        "score": 7,
        "created_at": "1620365282",
        "last_modified": "1620365282",
        "endorsed": true,
        "replies": [
          {
            "id": 2,
            "anonymous": false,
            "author_name": "Jane Doe",
            "author_avatar_url": "avatar.png",
            "body": "good answer!",
            "created_at": "1620365282",
            "last_modified": "1620365282"
          }
        ]
      },
      {
        "id": 3,
        "anonymous": false,
        "author_name": "Milly Monka",
        "author_avatar_url": "avatar.png",
        "author_permissions": 1,
        "body": "Use <b>text</b>.",
        "score": 1,
        "created_at": "1620365282",
        "last_modified": "1620365282",
        "endorsed": false,
        "replies": [
          {
            "id": 4,
            "anonymous": true,
            "author_name": "John Doe",
            "author_avatar_url": "anonymous.png",
            "body": "this doesn't work!",
            "created_at": "1620365282",
            "last_modified": "1620365282"
          }
        ]
      }
    ]
  },
  {
    "id": 1,
    "title": "How do I italicize text in Angular?",
    "body": "I'm trying to italicize text but can't figure out how. Any ideas? I'm trying to italicize text but can't figure out how. Any ideas?",
    "bookmarked": true,
    "created_at": "1620365282",
    "last_modified": "1620365282",
    "best_answer": null,
    "author_name": "FirstName LastName",
    "tags": [
      {
        "id": 1,
        "name": "general"
      },
      {
        "id": 8,
        "name": "html"
      }
    ],
    "pinned": true,
    "views": 9,
    "comments": [
      {
        "id": 1,
        "anonymous": false,
        "author_name": "Willy Wonka",
        "author_avatar_url": "avatar.png",
        "author_permissions": 0,
        "body": "Try <i>text</i>.",
        "score": 7,
        "created_at": "1620365282",
        "last_modified": "1620365282",
        "endorsed": true,
        "replies": [
          {
            "id": 2,
            "anonymous": false,
            "author_name": "Jane Doe",
            "author_avatar_url": "avatar.png",
            "body": "good answer!",
            "created_at": "1620365282",
            "last_modified": "1620365282"
          }
        ]
      },
      {
        "id": 3,
        "anonymous": false,
        "author_name": "Milly Monka",
        "author_avatar_url": "avatar.png",
        "author_permissions": 1,
        "body": "Use <b>text</b>.",
        "score": 1,
        "created_at": "1620365282",
        "last_modified": "1620365282",
        "endorsed": false,
        "replies": [
          {
            "id": 4,
            "anonymous": true,
            "author_name": "John Doe",
            "author_avatar_url": "anonymous.png",
            "body": "this doesn't work!",
            "created_at": "1620365282",
            "last_modified": "1620365282"
          }
        ]
      }
    ]
  }
];

const dummyTags = [
  {
    "id": 1,
    "name": "general"
  },
  {
    "id": 2,
    "name": "other"
  },
  {
    "id": 3,
    "name": "project"
  },
  {
    "id": 4,
    "name": "core"
  },
  {
    "id": 5,
    "name": "stretch"
  },
  {
    "id": 6,
    "name": "react"
  },
  {
    "id": 7,
    "name": "ruby"
  },
  {
    "id": 8,
    "name": "html"
  }
];

const dummyUser = {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjIwNTAyMTQ0fQ.h89X0-TNtL436Qe8Zaaa5lewJCNmfM5Enjc8LeiPFT0",
  "first_name": "Reggi",
  "last_name": "Sirilan",
  "email": "rs@rs.ca",
  "avatar_url": "/images/avatars/2.png"
};

const dummyCourseData = {
  "id": 1,
  "name": "JS for Beginners",
  "description": "Introduction to core JavaScript concepts",
  "archived": false,
  "analytics": {
    "user_count": "4",
    "total_posts": "2",
    "total_comments": "5",
    "num_unresolved_questions": "1",
    "num_resolved_questions": "1"
  },
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
    }
  ],
  "posts": [
    {
      "id": 2,
      "title": "How do I create a class?",
      "body": "How do I write a new class in javascript, and declare methods, variables, etc?",
      "bookmarked": false,
      "created_at": "2021-05-08T20:00:11.570Z",
      "last_modified": "2021-05-08T20:00:11.570Z",
      "best_answer": null,
      "author_first_name": "Fiona",
      "author_last_name": "Ford",
      "author_avatar_id": null,
      "pinned": false,
      "views": 0,
      "anonymous": false,
      "role": "student",
      "user_id": 6,
      "editable": false,
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
          "author_avatar_id": null,
          "body": "You create a class with the Class keyword followed by {}",
          "score": "0",
          "created_at": "2021-05-08T20:00:11.574Z",
          "last_modified": "2021-05-08T20:00:11.574Z",
          "endorsed": false,
          "role": "instructor",
          "user_id": 3,
          "editable": false,
          "replies": []
        }
      ]
    },
    {
      "id": 1,
      "title": "How do I use a promise?",
      "body": "I am using a new library that returns a Promise object instead of a callback... how do I act on it once its done?",
      "bookmarked": false,
      "created_at": "2021-05-08T20:00:11.570Z",
      "last_modified": "2021-05-08T20:00:11.570Z",
      "best_answer": 2,
      "author_first_name": "Edward",
      "author_last_name": "Ecksworth",
      "author_avatar_id": null,
      "pinned": false,
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
          "author_avatar_id": null,
          "body": "You can consume a promise by calling .then() on it! Be sure to use .catch() as well in case of errors.",
          "score": "3",
          "created_at": "2021-05-08T20:00:11.574Z",
          "last_modified": "2021-05-08T20:00:11.574Z",
          "endorsed": true,
          "role": "student",
          "user_id": 6,
          "editable": false,
          "replies": [
            {
              "id": 4,
              "parent_id": 2,
              "anonymous": false,
              "author_first_name": "Edward",
              "author_last_name": "Ecksworth",
              "author_avatar_id": null,
              "body": "Thanks for this!!",
              "created_at": "2021-05-08T20:00:11.574Z",
              "last_modified": "2021-05-08T20:00:11.574Z",
              "role": "student",
              "user_id": 5,
              "editable": true
            }
          ]
        },
        {
          "id": 6,
          "post_id": 1,
          "anonymous": false,
          "author_first_name": "Aaron",
          "author_last_name": "Aldridge",
          "author_avatar_id": null,
          "body": "Be sure to check out Promise.resolve and Promise.reject as well for more info.",
          "score": "0",
          "created_at": "2021-05-08T20:00:11.574Z",
          "last_modified": "2021-05-08T20:00:11.574Z",
          "endorsed": false,
          "role": "admin",
          "user_id": 1,
          "editable": false,
          "replies": []
        },
        {
          "id": 1,
          "post_id": 1,
          "anonymous": true,
          "author_avatar_id": 1,
          "body": "I had the same question!",
          "score": "0",
          "created_at": "2021-05-08T20:00:11.574Z",
          "last_modified": "2021-05-08T20:00:11.574Z",
          "endorsed": false,
          "role": "student",
          "user_id": 5,
          "editable": true,
          "replies": []
        }
      ]
    }
  ]
};

const App = (props) => {


  const [user, setUser] = useState(dummyUser);
  const [posts, setPosts] = useState(dummyPosts);
  const [tags, setTags] = useState(dummyTags);
  const [active, setActive] = useState("post");
  const [viewTitle, setViewTitle] = useState("Dashboard");
  const [courseData, setCourseData] = useState(dummyCourseData);

  // TODO: Use useEffect to fetch data from the server (replace dummy data)

  // TODO: Create functions that add/edit/remove items from the data (addPost, updatePost, deletePost, etc.)

  // TODO: Create a function that changes active to post, dashboard, or analytics
  // Whenever this happens, viewTitle should be changed

  const toggleView = (view) => {
    setActive(view);
  };

  return (
    <main className="App">
      <Nav
        active={active}
        viewTitle={viewTitle}
        courseName="LHL Web Mar 1"
        userAvatar={user.avatar_url}
        userName={`${user.first_name} ${user.last_name}`}
      />
      <section>
        <div className="left">
          <PostList tags={courseData.tags} posts={courseData.posts} />
        </div>
        <div className="right">
          <Main active={active} data={courseData} />
        </div>
      </section>
    </main>
  );
};

export default App;
