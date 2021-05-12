import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";
import PostList from "./PostList";
import Main from "./Main";
import Button from "./Button";
import Login from "./Login";
import Register from "./Register";
import Error404 from "./Error404";
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

  COURSES: "/api/courses", // data = { state.courseID }

  POSTS: "/api/posts",

  BOOKMARKS: "/api/bookmarks",

  COMMENTS: "/api/comments"

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
    console.log("fetching course data");
    fetchCourseData(state.courseID);
  }, [state.courseID, state.active, state.reloader]);

  // Show a loading screen if courseData is null
  useEffect(() => {
    setState({ ...state, loading: !state.courseData });
  }, [state.courseData]);

  // If postID changes, check that the active view is "Post". If not, change to it.
  useEffect(() => {
    if (state.postID && state.active !== "Post") {
      console.log("postID changed and active was not on Post. changing now...");
      // setState({ ...state, active: "Post" });
      // console.log(state.postID);
      // setActive("Post", state.postID);
    }
  }, [state.postID]);

  // Reloader
  useEffect(() => {
    console.log("COURSEDATA TRIGGERED");
  }, [state.courseData]);

  // Reloader
  useEffect(() => {
    console.log("POSTS TRIGGERED", state.posts);
  }, [state.posts]);

  // Reloader
  useEffect(() => {
    console.log("POSTDATA TRIGGERED", state.postData);
  }, [state.postData]);

  // Reloader
  useEffect(() => {
    console.log("POSTID TRIGGERED", state.postID);
  }, [state.postID]);

  // Reloader
  useEffect(() => {
    console.log("ACTIVE TRIGGERED", state.active);
  }, [state.active]);

  // Reloader
  useEffect(() => {
    console.log("RELOADER TRIGGERED");
  }, [state.reloader]);

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
      url: url + (id ? `/${id}` : ""),
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
    } else if (type === "post") {
      setState({
        ...state,
        postData: data,
        postID: data.id,
        reloader: !state.reloader
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

  // Request to create a new post with the given data
  const addPost = (data) => {

    console.log("Requesting to add a new post with data:", data);

    request("POST", API.POSTS, null, data)
      .then((postData) => {
        // Update state to contain the new post data
        // Reload course data
        setState({
          ...state,
          postID: postData.id,
          postData: postData,
          posts: { ...state.posts, postData },
          reloader: !state.reloader
        });
      })
      .catch((err) => {
        console.log("An error occurred. Check that the form is complete!");
      });
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

  // Request to add a comment with the given data
  const addComment = (data) => {
    request("POST", API.COMMENTS, null, data)
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

  // Change the active view to "Dashboard", "Analytics", "New Post", "Post" (requires postID) and refresh course data
  const setActive = (selection, postID = null, postData = null) => {
    if (selection === "Post") {
      setState({
        ...state,
        active: selection,
        postID: postID,
        postData: postData ? postData : getPostByID(state.posts, state.postID),
        reloader: !state.reloader
      });
    } else {
      setState({
        ...state,
        active: selection,
        postID: null,
        postData: null,
        reloader: !state.reloader
      });
    }
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

      <Router>

        <Switch>

          <Route path="/" exact render={(props) => (
            <>
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
                          active={state.active}
                          selectedPostID={state.postID}
                          tags={state.courseData.tags}
                          posts={state.courseData.posts}
                          onClick={(postID) => setActive("Post", postID)}
                          selectedTags={state.selectedTags}
                          onTagToggle={updateSelectedTags}
                          onTagClear={clearSelectedTags}
                          onNewPost={() => setActive("New Post")}
                        />
                      </div>

                      {/* Current View */}
                      <div className="app-right">
                        <Main
                          active={state.active}
                          userData={state.user}
                          courseData={state.courseData}
                          postID={state.postID}
                          onEditBookmark={editBookmark}
                          onAddPost={addPost}
                          onEditPost={editPost}
                          onDeletePost={deletePost}
                          onAddComment={addComment}
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
            </>
          )} />

          <Route path="/login" exact component={Login} />

          <Route path="/register" exact component={Register} />

          <Route component={Error404} />

        </Switch>

      </Router>
    </div>

  );
};

export default App;
