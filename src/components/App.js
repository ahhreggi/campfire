import { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./Nav";
import PostList from "./PostList";
import Main from "./Main";
import Button from "./Button";
import "./App.scss";

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
  RESET: "/api/debug/reset_db",

  COURSES: "/api/courses/:id", // data = { state.courseID }

  POSTS: "/api/posts/:id",

  BOOKMARKS: "/api/bookmarks",

  COMMENTS: "/api/comments/:id",

  LIKE: "/api/comments/:id/like",
  UNLIKE: "/api/comments/id/unlike"

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

    selectedTags: [],

    loading: true,
    reloader: false // set this to !reloader when making a request without fetchCourseData and a reload is needed
  });

  // Fetch course data when:
  // -- selecting a new courseID
  // -- changing active view
  // -- changing active postID
  useEffect(() => {
    fetchCourseData(state.courseID);
  }, [state.courseID, state.reloader]);

  // Show a loading screen if courseData is null
  useEffect(() => {
    setState({ ...state, loading: !state.courseData });
  }, [state.courseData]);

  // SERVER-REQUESTING FUNCTIONS ////////////////////////////////////

  const resetDB = () => {
    console.log("Re-seeding database as admin...");
    setState({ ...state, courseData: null });
    request("GET", API.RESET, null, null, "admin")
      .then(() => {
        setTimeout(() => {
          setActive("Dashboard");
        }, 1000);
      });
  };

  // Create an axios request
  const request = async(method, url, id = null, data = null, role = null) => {
    // If a role is provided, use its token, otherwise use state.authToken
    return axios({
      method: method,
      url: url.replace(":id", id),
      headers: {
        "Authorization": role ? tokens[role] : state.authToken
      },
      data
    })
      .then(res => res.data)
      .catch(err => console.log(err));
  };

  // Fetch course data from the server
  const fetchCourseData = (courseID) => {
    request("GET", API.COURSES, courseID)
      .then(data => {
        setAppData(data, "course");
        console.log(data);
      });
  };

  // Set the application data
  const setAppData = (data, type) => {
    if (type === "course") {
      setState({
        ...state,
        courseData: data,
        postData: data ? getPostByID(data.posts, state.postID) : null,
        posts: data ? data.posts : null,
        loading: !data
      });
    }
  };

  // Edit the user's bookmark for the given postID
  const editBookmark = (postID, bookmarked) => {
    axios({
      method: bookmarked ? "DELETE" : "POST",
      url: bookmarked ? API.BOOKMARKS : API.BOOKMARKS,
      headers: {
        "Authorization": state.authToken
      },
      data: { postID }
    })
      .then(() => fetchCourseData(state.courseID))
      .catch((err) => console.log(err));
  };

  // Request to edit a postID with the given data
  const editPost = (postID, data) => {
    request("PATCH", API.POSTS, postID, data)
      .then(() => fetchCourseData(state.courseID))
      .catch((err) => console.log(err));
  };

  // Request to delete a post by ID and redirect to Dashboard
  const deletePost = (postID) => {
    request("DELETE", API.POSTS, postID)
      .then(() => setActive("Dashboard"))
      .catch((err) => console.log(err));
  };

  // Request to like a comment by ID
  const likeComment = (commentID, liked) => {
    const url = API.COMMENTS.replace(":id", commentID) + (liked ? "/unlike" : "/like");
    request("POST", url)
      .then(() => fetchCourseData(state.courseID))
      .catch((err) => console.log(err));
  };

  // Request to edit a comment by ID with the given data
  const editComment = (commentID, data) => {
    request("PATCH", API.COMMENTS, commentID, data)
      .then(() => fetchCourseData(state.courseID))
      .catch((err) => console.log(err));
  };

  // Request to delete a comment by ID
  const deleteComment = (commentID) => {
    request("DELETE", API.COMMENTS, commentID)
      .then(() => setActive("Post", state.postID))
      .catch((err) => console.log(err));
  };

  // STATE-AFFECTING FUNCTIONS //////////////////////////////////////

  // Change the active view to "Dashboard", "Analytics", "Post" (requires postID) and refresh course data
  const setActive = (selection, postID = null) => {
    setState({
      ...state,
      active: selection,
      postID: selection === "Post" ? postID : null,
      postData: selection === "Post" ? getPostByID(state.posts, postID) : null,
      reloader: !state.reloader
    });

  };

  // Update the selected tags dynamically as the user toggles them
  // If only is set to true, only the given tag will be selected
  const updateSelectedTags = (tag, only = false) => {
    if (only) {
      setState({ ...state, selectedTags: [tag] });
    } else {
      const selected = hasTag(state.selectedTags, tag.id);
      if (selected) {
        const updatedTags = state.selectedTags.filter(sTag => sTag.id !== tag.id);
        setState({ ...state, selectedTags: updatedTags });
      } else {
        setState({ ...state, selectedTags: [ ...state.selectedTags, tag] });
      }
    }
  };

  // Clear selected tags
  const clearSelectedTags = () => {
    setState({ ...state, selectedTags: [] });
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
      {state.loading &&
        <div className="display-4 d-flex justify-content-center align-items-center h-100">
          Loading...
        </div>}

      {/* Course View (courseData exists) */}
      {!state.loading && state.courseData &&
        <>

          {/* Nav Bar */}
          <Nav
            onClick={setActive}
            active={state.active}
            viewTitle={`${state.courseData.name} > ${state.postID ? "Post @" + state.postID : state.active }`}
            courseName="LHL Web Mar 1"
            userAvatar={state.user.avatar_id}
            userName={`${state.user.first_name} ${state.user.last_name}`}
          />

          <section className="app-containers">

            {/* All Posts */}
            <div className="app-left">
              <PostList
                selectedPostID={state.postID}
                tags={state.courseData.tags}
                posts={state.courseData.posts}
                onClick={(postID) => setActive("Post", postID)}
                selectedTags={state.selectedTags}
                onTagToggle={updateSelectedTags}
                onTagClear={clearSelectedTags}
              />
            </div>

            {/* Current View */}
            <div className="app-right">
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
            <Button text="Dashboard" onClick={() => setActive("Dashboard")} />
            <Button text="Analytics" onClick={() => setActive("Analytics")} />
            <Button text="Refresh DB" onClick={() => resetDB()} />
          </div>

        </>
      }
    </div>
  );
};

export default App;
