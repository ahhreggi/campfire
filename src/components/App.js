import { useState, useEffect } from "react";
import "./App.scss";
import Nav from "./Nav";
import PostList from "./PostList";
import Main from "./Main";
import Button from "./Button";

// TEMPORARY DUMMY DATA /////////////////////////////////////////////

let dummyUser = {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjIwNTAyMTQ0fQ.h89X0-TNtL436Qe8Zaaa5lewJCNmfM5Enjc8LeiPFT0",
  "first_name": "Reggi",
  "last_name": "Sirilan",
  "email": "rs@rs.ca",
  "avatar_url": "/images/avatars/2.png"
};

let dummyCourseData = {
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
    }
  ]
};

/////////////////////////////////////////////////////////////////////

const App = () => {

  const [state, setState] = useState({
    user: dummyUser, // current user
    active: "Dashboard", // current view ("Dashboard", "Analytics", "Post"), default landing: Dashboard
    courseData: null, // all data for the current course
    postID: null, // a post ID or null if viewing dashboard/analytics,
    post: null // post data for the current post ID or null if viewing dashboard/analytics
  });

  // TODO: Use useEffect to fetch data from the server (replace dummy data)

  // Fetch data from the server on load
  useEffect(() => {
    // Fetch course data
    fetchCourseData();
  }, []);

  // Fetch course data from the server
  // TODO: Replace with an actual API request
  const fetchCourseData = () => {
    // Request data from the server and await a response
    setTimeout(() => {
      const res = dummyCourseData;
      // If the request is successful and a response is received
      if (res) {
        // Update state with the response data
        setState({ ...state, courseData: res });
        // If the active view is a post, update the post data in the state using the res data
        if (state.active === "Post") {
          const selectedPost = getPostByID(res.posts, state.postID);
          setState({ ...state, post: selectedPost });
        }
      }
    }, 1000);
  };

  // Update course data in the server
  // TODO: Replace with an actual API request
  const updateCourseData = (updatedCourseData) => {
    // Send data to server and request to insert changes
    dummyCourseData = updatedCourseData;
    // Await a response
    setTimeout(() => {
      const res = dummyCourseData;
      // If the request is successful and a response is received, update state with the res data
      const updatedCourseData = res;
      const updatedPost = getPostByID(res.posts, state.postID);
      setState({ ...state, courseData: updatedCourseData, post: updatedPost });
    }, 1000);
  };

  // Change the active view to "Dashboard", "Analytics", "Post" (requires postID)
  const selectActive = (selection, postID = null) => {
    // Get the current post data
    const selectedPost = getPostByID(state.courseData.posts, postID);
    // Update state data
    setState({
      ...state,
      active: selection,
      postID: postID,
      post: selectedPost
    });

  };

  const onEditPost = (postID, data) => {
    // Update the given postID with the new data
    const prevPost = getPostByID(state.courseData.posts, postID);
    const newPost = { ...prevPost, ...data };
    // Update courseData.posts with the updated post
    const newPosts = state.courseData.posts.map(post => {
      if (post.id === postID) {
        return newPost;
      } else {
        return post;
      }
    });
    // Update courseData with the updated posts
    const newCourseData = { ...state.courseData, posts: newPosts };

    // Update state with the updated courseData and current post
    // setState({ ...state, courseData: updatedCourseData, post: updatedPost });

    // FAKE: Update course data on the server
    console.log("sending new data to dummy server...");
    updateCourseData(newCourseData);
    // if successful, this will update courseData in the state
  };

  const onEditComment = (commentID, data) => {
    console.log("onEditComment executed with data:", data);
  };

  // Get post for current state.postID
  const getPostByID = (posts, postID) => {
    if (postID) {
      return posts.filter(post => post.id === postID)[0];
    }
  };

  return (
    <div className="App">
      {!state.courseData && <div>Loading...</div>}
      {state.courseData &&
        <>
          <Nav
            active={state.active}
            viewTitle={`${state.courseData.name} > ${state.postID ? "Post @" + state.postID : state.active }`}
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
                postID={state.postID}
                onEditPost={onEditPost} // needs to be in App since it feeds data to PostList
                onEditComment={onEditComment} // same ^
              />
            </div>
          </section>
          <div className="test-controls">
            test controls:
            <Button text="Dashboard" onClick={() => selectActive("Dashboard")} />
            <Button text="Analytics" onClick={() => selectActive("Analytics")} />
          </div>
        </>
      }
    </div>
  );
};

export default App;
