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
  "avatar_id": 2
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
  "secrets": {
    "student_access_code": "111111",
    "instructor_access_code": "222222"
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
      "title": "How do I create a class? 1 2 3 4 5 6 7 8 9 1 2 3 4",
      "body": "How do I write a new class in javascript, and declare methods, variables, etc?",
      "bookmarked": false,
      "created_at": "2021-05-10T15:40:05.671Z",
      "last_modified": "2021-05-10T15:40:05.671Z",
      "best_answer": null,
      "author_first_name": "Fiona",
      "author_last_name": "Ford",
      "author_avatar_id": 7,
      "pinned": false,
      "views": 0,
      "anonymous": false,
      "role": "student",
      "user_id": 6,
      "pinnable": true,
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
          "anonymous": true,
          "author_first_name": "Carson",
          "author_last_name": "Cool",
          "author_avatar_id": 4,
          "body": "You create a class with the Class keyword followed by {}",
          "score": 0,
          "created_at": "2021-05-10T15:40:05.671Z",
          "last_modified": "2021-06-10T15:40:05.671Z",
          "liked": true,
          "endorsed": false,
          "role": "instructor",
          "user_id": 3,
          "editable": true,
          "endorsable": true,
          "endorsements": [],
          "replies": []
        }
      ]
    },
    {
      "id": 1,
      "title": "How do I use a promise?",
      "body": "I am using a new library that returns a Promise object instead of a callback... how do I act on it once its done?",
      "bookmarked": false,
      "created_at": "2021-05-10T15:40:05.671Z",
      "last_modified": "2021-05-10T15:40:05.671Z",
      "best_answer": 2,
      "author_first_name": "Edward",
      "author_last_name": "Ecksworth",
      "author_avatar_id": 6,
      "pinned": false,
      "views": 0,
      "anonymous": false,
      "role": "student",
      "user_id": 5,
      "pinnable": true,
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
          "author_avatar_id": 7,
          "body": "You can consume a promise by calling .then() on it! Be sure to use .catch() as well in case of errors.",
          "score": 999,
          "created_at": "2021-05-10T15:40:05.671Z",
          "last_modified": "2021-07-10T15:40:05.671Z",
          "liked": false,
          "endorsed": true,
          "role": "student",
          "user_id": 6,
          "editable": true,
          "endorsable": true,
          "endorsements": [
            {
              "id": 1,
              "user_id": 3,
              "endorser_name": "Carson Cool",
              "comment_id": 2
            }
          ],
          "replies": [
            {
              "id": 4,
              "parent_id": 2,
              "anonymous": false,
              "author_first_name": "Edward",
              "author_last_name": "Ecksworth",
              "author_avatar_id": 6,
              "body": "Thanks for this!!",
              "score": 0,
              "created_at": "2021-05-10T15:40:05.671Z",
              "last_modified": "2021-06-10T15:40:05.671Z",
              "liked": false,
              "endorsed": true,
              "role": "student",
              "user_id": 5,
              "editable": true,
              "endorsable": true,
              "endorsements": []
            },
            {
              "id": 5,
              "parent_id": 2,
              "anonymous": false,
              "author_first_name": "Edward",
              "author_last_name": "Ecksworth",
              "author_avatar_id": 7,
              "body": "123123123",
              "score": 5,
              "created_at": "2021-05-10T15:40:05.671Z",
              "last_modified": "2021-05-10T15:40:05.671Z",
              "liked": true,
              "endorsed": true,
              "role": "student",
              "user_id": 5,
              "editable": true,
              "endorsable": true,
              "endorsements": []
            }
          ]
        },
        {
          "id": 6,
          "post_id": 1,
          "anonymous": false,
          "author_first_name": "Aaron",
          "author_last_name": "Aldridge",
          "author_avatar_id": 2,
          "body": "Be sure to check out Promise.resolve and Promise.reject as well for more info.",
          "score": 0,
          "created_at": "2021-05-10T15:40:05.671Z",
          "last_modified": "2021-05-10T15:40:05.671Z",
          "liked": false,
          "endorsed": false,
          "role": "admin",
          "user_id": 1,
          "editable": true,
          "endorsable": true,
          "endorsements": [],
          "replies": []
        },
        {
          "id": 1,
          "post_id": 1,
          "anonymous": true,
          "author_first_name": "Edward",
          "author_last_name": "Ecksworth",
          "author_avatar_id": 6,
          "body": "I had the same question!",
          "score": 0,
          "created_at": "2021-05-10T15:40:05.671Z",
          "last_modified": "2021-05-10T15:40:05.671Z",
          "liked": true,
          "endorsed": false,
          "role": "student",
          "user_id": 5,
          "editable": true,
          "endorsable": true,
          "endorsements": [],
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
    post: null, // post data for the current post ID or null if viewing dashboard/analytics
    selectedTags: []
  });

  // Fetch data from the server on load
  useEffect(() => {
    // Fetch course data
    fetchCourseData();
  }, []);

  // STATE-AFFECTING FUNCTIONS //////////////////////////////////////

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

  // Update the selected tags dynamically as the user toggles them
  const updateSelectedTags = (tag, only = false) => {
    // If only is true, select only the given tag
    if (only) {
      setState({ ...state, selectedTags: [tag] });
    } else {
      const selected = hasTag(state.selectedTags, tag.id);
      // If the tag is already selected, unselect it
      if (selected) {
        const updatedTags = state.selectedTags.filter(sTag => sTag.id !== tag.id);
        setState({ ...state, selectedTags: updatedTags });
        // Otherwise, select it
      } else {
        setState({ ...state, selectedTags: [ ...state.selectedTags, tag] });
      }
    }
  };

  // Clear selected tags
  const clearSelectedTags = () => {
    setState({ ...state, selectedTags: [] });
  };

  // SERVER-REQUESTING FUNCTIONS ////////////////////////////////////

  // Fetch course data from the server
  // TODO: Replace with an actual API request
  const fetchCourseData = (courseID) => {

    // TODO: API Request
    console.log("API: Requesting all course data for the course ID", courseID);

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
    }, 1);
  };

  // MOCK: Update course data in the server
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
    }, 1);
  };

  // Request to toggle pin for a post by ID
  // Source: Post
  const pinPost = (postID) => {

    // TODO: API Request
    console.log("API: Requesting to PIN a post with the post ID", postID);

    // Get current pin value of post
    const pinned = getPostByID(state.courseData.posts, postID).pinned;
    // Request to update post data
    editPost(postID, { pinned: !pinned });
  };

  // Request to toggle bookmark for post by ID
  // Source: Post
  const bookmarkPost = (postID) => {

    // TODO: API Request
    console.log("API: Requesting to BOOKMARK a post with the post ID", postID);

    // Get current bookmark value of post
    const bookmarked = getPostByID(state.courseData.posts, postID).bookmarked;
    // Request to update user bookmarks
    editPost(postID, { bookmarked: !bookmarked });
  };

  // Request to edit a post by ID with the given data
  // Source: Post
  const editPost = (postID, data) => {

    // TODO: API Request
    console.log("API: Requesting to UPDATE a post with the post ID", postID);
    console.log("Data:", data);

    // Get the current post by ID
    const currentPost = getPostByID(state.courseData.posts, postID);
    // Update the post with the new data
    const newPost = { ...currentPost, ...data };
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
    // Request to update course data in the server
    updateCourseData(newCourseData);
  };

  // Request to delete a post by ID
  const deletePost = (postID) => {

    // TODO: API Request
    console.log("API: Requesting to DELETE a post with the post ID", postID);

    // MOCK: Send a delete request to the server
    // SUCCESS: Redirect to dashboard
    // ERROR: Return to post and display an error message
    // Temp: Retrieve all posts except the one with postID
    const newPosts = state.courseData.posts.filter(post => post.id !== postID);
    const newCourseData = { ...state.courseData, posts: newPosts };
    // Update state using the response data and redirect
    const res = newCourseData;

    if (res) {
      setState({
        ...state,
        active: "Dashboard",
        courseData: newCourseData,
        postID: null,
        post: null
      });
    } else {
      console.log("An error occurred while deleting the post.");
    }
  };

  // Request to like a comment by ID
  // Source: CommentListItem
  const likeComment = (commentID) => {

    // TODO: API Request
    console.log("API: Requesting to LIKE a comment with the comment ID", commentID);

  };

  // Request to endorse a comment by ID
  // Source: CommentListItem
  const endorseComment = (commentID) => {

    // TODO: API Request
    console.log("API: Requesting to ENDORSE a comment with the comment ID", commentID);

  };

  // Request to edit a comment by ID with the given data
  // Source: CommentListItem
  const editComment = (commentID, data) => {

    // TODO: API Request
    console.log("API: Requesting to UPDATE a comment with the comment ID", commentID);
    console.log("Data:", data);

  };

  // Request to delete a comment by ID
  // Source: CommentListItem
  const deleteComment = (commentID) => {

    // TODO: API Request
    console.log("API: Requesting to DELETE a comment with the comment ID", commentID);

  };

  // HELPER FUNCTIONS ///////////////////////////////////////////////

  // Return true if the given tagID is in tags
  // TODO: Move to helper file (also in Post)
  const hasTag = (tags, tagID) => {
    return tags.filter(tag => tag.id === tagID).length;
  };

  // Return post data for the given post ID
  const getPostByID = (posts, postID) => {
    if (postID) {
      return posts.filter(post => post.id === postID)[0];
    }
  };

  ///////////////////////////////////////////////////////////////////

  return (
    <div className="App">

      {/* Loading Message (when there is no courseData) */}
      {!state.courseData && <div>Loading...</div>}

      {/* Course View (courseData exists) */}
      {state.courseData &&
        <>

          {/* Nav Bar */}
          <Nav
            onClick={selectActive}
            active={state.active}
            viewTitle={`${state.courseData.name} > ${state.postID ? "Post @" + state.postID : state.active }`}
            courseName="LHL Web Mar 1"
            userAvatar={state.user.avatar_id}
            userName={`${state.user.first_name} ${state.user.last_name}`}
          />

          <section>

            {/* All Posts */}
            <div className="left">
              <PostList
                selectedPostID={state.postID}
                tags={state.courseData.tags}
                posts={state.courseData.posts}
                onClick={(postID) => selectActive("Post", postID)}
                selectedTags={state.selectedTags}
                onTagToggle={updateSelectedTags}
                onTagClear={clearSelectedTags}
              />
            </div>

            {/* Current View */}
            <div className="right">
              <Main
                active={state.active}
                courseData={state.courseData}
                postID={state.postID}
                onPinPost={pinPost}
                onBookmarkPost={bookmarkPost}
                onEditPost={editPost}
                onDeletePost={deletePost}
                onLikeComment={likeComment}
                onEndorseComment={endorseComment}
                onEditComment={editComment}
                onDeleteComment={deleteComment}
                onTagToggle={updateSelectedTags}
              />
            </div>

          </section>

          {/* Test Controls */}
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
