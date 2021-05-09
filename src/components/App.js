import { useState, useEffect } from "react";
import "./App.scss";
import Nav from "./Nav";
import PostList from "./PostList";
import Main from "./Main";
import Button from "./Button";

// Temporary data

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
      "body": "I am using a new library that returns a Promise object instead of a callback... how do I act on it once its done?",
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
    }
  ]
};

const App = (props) => {

  const [state, setState] = useState({
    user: dummyUser,
    active: "Dashboard",
    courseData: dummyCourseData,
    post: null
  });

  // TODO: Use useEffect to fetch data from the server (replace dummy data)

  // TODO: Create functions that add/edit/remove items from the data (addPost, updatePost, deletePost, etc.)

  // TODO: Create a function that changes active to post, dashboard, or analytics
  // Whenever this happens, viewTitle should be changed

  const selectActive = (selection, postID = null) => {
    setState({
      ...state,
      active: selection,
      post: postID === null ? null : state.courseData.posts.filter(post => post.id === postID)[0]
    });
  };

  const onEditComment = (commentID, data) => {
    console.log("onEditComment executed with data:", data);
  };

  return (
    <main className="App">
      <Nav
        active={state.active}
        viewTitle={state.active} // temporary
        courseName="LHL Web Mar 1"
        userAvatar={state.user.avatar_url}
        userName={`${state.user.first_name} ${state.user.last_name}`}
      />
      <section>
        <div className="left">
          <PostList
            tags={state.courseData.tags}
            posts={state.courseData.posts}
            onClick={(postID) => selectActive("Post", postID)}
          />
        </div>
        <div className="right">
          <Main
            active={state.active}
            courseData={state.courseData}
            post={state.post}
            onEditComment={onEditComment}
          />
        </div>
      </section>
      <div className="test-controls">
        test controls:
        <Button text="Dashboard" onClick={() => selectActive("Dashboard")} />
        <Button text="Analytics" onClick={() => selectActive("Analytics")} />
      </div>
    </main>
  );
};

export default App;
