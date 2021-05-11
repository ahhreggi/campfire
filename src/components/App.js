import { useState, useEffect } from "react";
import axios from "axios";
import "./App.scss";
import Nav from "./Nav";
import PostList from "./PostList";
import Main from "./Main";
import Button from "./Button";

// TEMPORARY DUMMY DATA /////////////////////////////////////////////

let tokens = {
  "admin": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjIwNzQ3MjI4fQ.i1gNBhXeJNrnWhlLqngOYqloLPe3HkkGKMp30EfbFgY",
  // owner of course 1:
  "owner": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIwNzQ4MjE1fQ.kM16mLvZLmxthRkhWBIZw7QWQ7XMl2nty1y3JKzfdts",
  // non-owner instructor of course 1:
  "instructor": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjIwNzQ4MjAxfQ.EMzIvNQTDvgf1hKo0-z-LMs2qpmXDuGcu6sPlRz2RkQ",
  // student in course 1:
  "student": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiaWF0IjoxNjIwNzQ4MTcwfQ.rZKQEy9cvl5byYNji8_k4MFtYEQG_XtLsCU7kiEaxOk"
};

let dummyUser = {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjIwNzQ3MjI4fQ.i1gNBhXeJNrnWhlLqngOYqloLPe3HkkGKMp30EfbFgY",
  "first_name": "Reggi",
  "last_name": "Sirilan",
  "email": "rs@rs.ca",
  "avatar_id": 2
};

/////////////////////////////////////////////////////////////////////

const API = {
  // GET_COURSES: "/api/courses",
  GET_COURSE: "/api/courses/:id", // data = { state.courseID }
  EDIT_POST: "/api/posts/:id", // data = { ...updatedData }
  ADD_BOOKMARK: "/api/bookmarks", // data = { postID: state.postID }
  DELETE_BOOKMARK: "/api/bookmarks" // data = { postID: state.postID }
};

/////////////////////////////////////////////////////////////////////

const App = () => {

  const [state, setState] = useState({
    user: dummyUser, // current user
    active: "Dashboard", // current view ("Dashboard", "Analytics", "Post"), default landing: Dashboard
    authToken: tokens.admin,

    courseID: 1,
    courseData: null, // all data for the current courseID

    postID: null, // a post ID or null if viewing dashboard/analytics,
    postData: null, // post data for the current post ID or null if viewing dashboard/analytics

    posts: null, // all posts for the current course

    selectedTags: []
  });

  // Fetch data from the server on load
  useEffect(() => {

    console.log("API: Requesting all course data for the current course ID in state:", state.courseID);

    // Get course data for the current course ID in state
    fetchCourseData(state.courseID);

  }, []);

  // STATE-AFFECTING FUNCTIONS //////////////////////////////////////

  // Change the active view to "Dashboard", "Analytics", "Post" (requires postID)
  const selectActive = (selection, postID = null) => {
    // Get the current post data
    const selectedPostData = getPostByID(state.posts, postID);
    // Update state data
    setState({
      ...state,
      active: selection,
      postID: postID,
      postData: selectedPostData
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

  const request = async (method, url, id = null, data = null) => {
    return axios({
      method: method,
      url: url.replace(":id", id),
      headers: {
        "Authorization": state.authToken
      },
      data
    })
      .then(res => res.data)
      .catch(err => console.log(err));
  };

  // Fetch course data from the server
  const fetchCourseData = (courseID) => {

    console.log("API: Requesting all course data for the course ID", courseID);

    request("GET", API.GET_COURSE, courseID)
      .then(data => {
        setAppData(data, "course");
      });
  };

  const setAppData = (data, type) => {

    if (type === "course") {
      console.log("Updating courseData, postData, and posts...");

      // Updating courseData also updates state.posts and state.post
      setState({
        ...state,
        courseData: data,
        postData: getPostByID(data.posts, state.postID),
        posts: data.posts
      });

    }

  };

  // Send a POST or DELETE request based on the current user's bookmarked value
  const editBookmark = (postID, bookmarked) => {
    axios({
      method: bookmarked ? "DELETE" : "POST",
      url: bookmarked ? API.DELETE_BOOKMARK : API.ADD_BOOKMARK,
      headers: {
        "Authorization": state.authToken
      },
      data: { postId: postID }
    })
      .then((res) => {
        // Fetch updated course data to update local state
        fetchCourseData(state.courseID);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Request to edit a post by ID with the given data
  // Source: Post
  const editPost = (postID, data) => {
    axios({
      method: "PATCH",
      url: API.EDIT_POST.replace(":id", postID),
      headers: {
        "Authorization": state.authToken
      },
      data
    })
      .then((res) => {
        // Fetch updated course data to update local state
        fetchCourseData(state.courseID);
      })
      .catch((error) => {
        console.log(error);
      });
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
        postData: null
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
      {!state.courseData &&
        <div className="display-4 d-flex justify-content-center align-items-center h-100">
          Fetching course data...
        </div>}

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

          <section className="app-containers">

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
                onEditBookmark={editBookmark}
                onEditPost={editPost}
                onDeletePost={deletePost}
                onLikeComment={likeComment}
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
