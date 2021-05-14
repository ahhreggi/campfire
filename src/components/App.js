import { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./Nav";
import PostList from "./PostList";
import Main from "./Main";
import Button from "./Button";

import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import Create from "./Create";
import Join from "./Join";

import DevData from "./DevData";
// import Error404 from "./Error404";

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

/////////////////////////////////////////////////////////////////////

const API = {

  RESET: "/api/debug/reset_db",

  COURSES: "/api/courses",

  POSTS: "/api/posts",

  BOOKMARKS: "/api/bookmarks",

  COMMENTS: "/api/comments",

  LOGIN: "/api/login",

  REGISTER: "/api/register",

  JOIN: "/api/join",

  CREATE: "/api/create"

};

/////////////////////////////////////////////////////////////////////

const App = () => {

  const [state, setState] = useState({
    userData: null, // fetchUserData
    userCourses: null, // fetchUserCourses

    active: "Login", // current view ("Dashboard", "Analytics", "Post"), default landing: Dashboard => if null, loading will become true

    courseID: null,
    courseData: null, // all data for the current courseID

    postID: null, // a post ID or null if viewing dashboard/analytics,
    postData: null, // post data for the current post ID or null if viewing dashboard/analytics

    posts: null, // all posts for the current course

    selectedTags: [],

    loading: false,
    reloader: false, // set this to !reloader when making a request without fetchCourseData and a reload is needed

    errors: null // key = active, value = array of messages, e.g. { "Login": ["Invalid username/password"] }

  });

  // Show a loading screen if active is null for some reason
  useEffect(() => {
    if (state.active === null) {
      setTimeout(() => {
        setState({ ...state, loading: true });
      }, 1000);
    } else {
      setState({ ...state, loading: false });
    }
  }, [state.active]);

  // TESTING ////////////////////////////////////////////////////////

  // Testing purposes
  // const setRole = (role) => {
  //   console.log("Setting auth token to", role);
  //   setState({ ...state, userData: { ...state.userData, token: tokens[role] }, role: role });
  // };

  // SERVER-REQUESTING FUNCTIONS ////////////////////////////////////

  const resetDB = () => {
    console.log("Re-seeding database as admin...");
    setState({});
    request("GET", API.RESET, null, null, "admin")
      .then(() => {
        setTimeout(() => {
          setActive("Login");
        }, 2000);
      });
  };

  // Create an axios request
  const request = async(method, url, id = null, data = null, role = null) => {

    // If a role is provided, use its token, otherwise use state.userData.token
    const params = (method + " " + url + (id ? `/${id}` : ""));
    const token = role ? tokens[role] : (state.userData ? state.userData.token : null);


    console.log("\n".repeat(10));
    console.log("🌐", params);
    console.log("🔑 STATE TOKEN:", token);
    if (data) {
      console.log("📝 DATA SENT:", data);
    }
    console.log("\n".repeat(2));

    return axios({
      method: method,
      url: url + (id ? `/${id}` : ""),
      headers: {
        "Authorization": token
      },
      data
    })
      .then(res => {
        console.log("✔️ SERVER RESPONSE:", res.data);
        return res.data;
      })
      .catch(err => {
        console.log("❌ SERVER RESPONSE:");
        console.error(err);
      });
  };

  // Set the application data
  //   userData: null, // fetchUserData
  //   userCourses: null, // fetchUserCourses

  //   active: "Login", // current view ("Dashboard", "Analytics", "Post"), default landing: Dashboard => if null, loading will become true

  //   courseID: null,
  //   courseData: null, // all data for the current courseID

  //   postID: null, // a post ID or null if viewing dashboard/analytics,
  //   postData: null, // post data for the current post ID or null if viewing dashboard/analytics

  //   posts: null, // all posts for the current course

  //   selectedTags: [],

  //   loading: false,
  //   reloader: false, // set this to !reloader when making a request without fetchCourseData and a reload is needed

  // Set the application data
  const setAppData = (data, type) => {
    if (type === "post") {
      setState({
        ...state,
        postData: data,
        postID: data.id,
        reloader: !state.reloader
      });
    } else if (type === "userData") {
      setState({ ...state, userData: data, errors: null });
    } else if (type === "userCourses") {
      let active = state.active;
      if (state.active === "Login") {
        active = "Home";
      } else if (state.active === "Create") {
        active = "Dashboard";
      } else if (state.active === "Join") {
        active = "Dashboard";
      }
      setState({ ...state, userCourses: data, active: active });
    } else if (type === "courseData") {
      setState({
        ...state,
        courseID: data.id,
        courseData: data,
        // Update post data if any are currently in state
        postData: data ? getPostByID(data.posts, state.postID) : null,
        posts: data ? data.posts : null
      });
    }
  };

  // USER REGISTRATION //////////////////////////////////////////////

  // VALIDATION
  // - Data is validated on the front-end except for email
  // - Attempting to register with an existing email displays an error

  // BASIC USER ROUTE
  // - User enters a first/last name, email, and password
  // - Data is sent to the server and the new user data is returned
  // - State is updated (userData)
  // - SIDE EFFECT: User courses are fetched from the server (fetchUserCourses)
  // - State is updated (userCourses)
  // - User is redirected to Home, where their courses would be displayed

  // Register a new user account
  // Potential errors: email already in use
  const registerUser = (data) => {
    request("POST", API.REGISTER, null, data)
      .then((userData) => {
        if (userData) {
          setAppData(userData, "userData");
        } else {
          console.log("❌ registerUser failed!");
          setState({ ...state, errors: ["Email already in use!"] });
        }
      });
  };

  // USER LOGIN /////////////////////////////////////////////////////

  // VALIDATION
  // - Attempting to login with invalid credentials displays an error

  // BASIC USER ROUTE
  // - User enters an email and password via the Login page
  // - User data is fetched from the server
  // - State is updated (userData, active: "Home")
  // - SIDE EFFECT 1: User courses are fetched from the server
  // - State is updated (userCourses)
  // - User is redirected to Home, where their courses are displayed

  // Fetch existing user data
  // Potential errors: user credentials are invalid
  const fetchUserData = (data) => {
    request("POST", API.LOGIN, null, { email: data.email, password: data.password })
      .then((userData) => {
        if (userData) {
          setAppData(userData, "userData");
        } else {
          console.log("❌ fetchUserData failed!");
          setState({ ...state, errors: ["Invalid username/password!"] });
        }
      });
  };

  // SIDE EFFECT 1: User courses are fetched from the server if userData exists
  useEffect(() => {
    if (state.userData) {
      fetchUserCourses();
    }
  }, [state.userData]);

  // Fetch the current user's courses
  const fetchUserCourses = () => {
    request("GET", API.COURSES)
      .then((userCourses) => {
        if (userCourses) {
          setAppData(userCourses, "userCourses");
        } else {
          console.log("❌ fetchUserCourses failed!");
        }
      });
  };

  // COURSE SELECTION ///////////////////////////////////////////////

  // BASIC USER ROUTE
  // - User clicks a course they are enrolled in on the Home page (after login/registration)
  // - Course data is fetched from the server
  // - State is updated (courseID, courseData)
  // - SIDE EFFECT 2: Active state is updated to redirect the user to the Dashboard

  // Fetch course data from the server
  const fetchCourseData = (courseID) => {
    request("GET", API.COURSES, courseID)
      .then((courseData) => {
        if (courseData) {
          setAppData(courseData, "courseData");
        } else {
          console.log("❌ fetchUserCourses failed!");
        }
      });
  };

  // SIDE EFFECT 2: Active state is updated to redirect the user from Home to the Dashboard if courseData exists
  // SIDE EFFECT 4: userCourses is updated if courseData exists and is not in userCourses (happens when creating/joining a course)
  useEffect(() => {
    if (state.courseData) {

      // Redirect to Dashboard if coming from the Home, Create, or Join page
      const origins = ["Home", "Create", "Join"];
      if (origins.includes(state.active)) {
        // If coming from the Create or Join page, add the new course data to userCourses
        let userCourses = [ ...state.userCourses ];
        if (state.active === "Create" || state.active === "Join") {
          console.log("hey das a new course!!");
          const isNewCourse = state.userCourses.filter(course => course.id === state.courseData.id).length < 1;
          if (isNewCourse) {
            const newCourse = {
              "id": state.courseData.id,
              "name": state.courseData.name,
              "created_at": state.courseData.created_at,
              "archived": state.courseData.archived,
              "role": state.courseData.role
            };
            userCourses = [ ...state.userCourses, newCourse ];
          }
        }
        setState({ ...state, userCourses: userCourses, active: "Dashboard" });
      }
    }

  }, [state.courseData]); // state.courseID?

  // COURSE CREATION ////////////////////////////////////////////////

  // BASIC USER ROUTE
  // - User enters new course information via the Create page
  // - Data is sent to the server and the new course data is returned
  // - State is updated (courseID, courseData)
  // - SIDE EFFECT 2: Active state is updated to redirect the user from Create to the Dashboard if courseData exists
  // - SIDE EFFECT 4: User courses are fetched from the server if active changes from "Create" to "Dashboard"

  // Create a new course and redirect to it
  const createCourse = (data) => {
    request("POST", API.CREATE, null, data)
      .then((courseData) => {
        if (courseData) {

          // TODO: Return the courseData object instead of the current redirect_to url

          // TEMP FIX:
          // Parse and retrieve the ID from the response body
          const courseID = parseInt(courseData.redirect_to.split("/")[2]);
          // State is updated (courseID)
          setState({ ...state, courseID: courseID });
          // SIDE EFFECT 3: Course data is fetched from the server if courseID exists and courseData doesn't
          fetchCourseData(courseID);
          // State is updated (courseData)
          // SIDE EFFECT 2: Active state is updated to redirect the user from Create to the Dashboard if courseData exists

        } else {
          console.log("❌ createCourse failed!");
        }
      });
  };

  // SIDE EFFECT 3: Course data is fetched from the server if courseID exists and courseData doesn't
  useEffect(() => {
    if (state.courseID && !state.courseData) {
      fetchCourseData(state.courseID);
      // SIDE EFFECT 2: Active state is updated to redirect the user from Create to the Dashboard if courseData exists
    }
  }, [state.courseID]);

  // COURSE ENROLLMENT //////////////////////////////////////////////

  // BASIC USER ROUTE
  // - User enters a course access code via the Join page
  // - Data is sent to the server and the new course data is returned
  // - State is updated (courseID, courseData)
  // - SIDE EFFECT 2: Active state is updated to redirect the user from Join to the Dashboard if courseData exists

  // Join an existing course via instructor or student access code and redirect to it
  const joinCourse = (data) => {
    request("POST", API.JOIN, null, data)
      .then((courseData) => {
        if (courseData) {

          // TODO: Return the courseData object instead of the current redirect_to url

          // TEMP FIX:
          // Parse and retrieve the ID from the response body
          const courseID = parseInt(courseData.redirect_to.split("/")[2]);
          // State is updated (courseID)
          setState({ ...state, courseID: courseID });
          // SIDE EFFECT 3: Course data is fetched from the server if courseID exists and courseData doesn't
          fetchCourseData(courseID);
          // State is updated (courseData)
          // SIDE EFFECT 2: Active state is updated to redirect the user from Join to the Dashboard if courseData exists

        } else {
          console.log("❌ joinCourse failed!");
          setState({ ...state, errors: ["Invalid access code!"] });
        }
      });
  };

  // BOOKMARKS //////////////////////////////////////////////////////

  // BASIC USER ROUTE
  // - User selects a course from the post list
  // - User presses the star icon to toggle the bookmark status of the post
  // - State is updated (courseID, courseData)
  // - The post is immediately moved to the appropriate category within the post list

  // Edit the user's bookmark for the given postID
  const editBookmark = (postID, bookmarked) => {
    const method = bookmarked ? "DELETE" : "POST";
    request(method, API.BOOKMARKS, null, { postID })
      .then(() => {
        fetchCourseData(state.courseID);
      });
  };

  // CREATE A POST //////////////////////////////////////////////////

  // BASIC USER ROUTE
  // - User presses the New Post button in the post list
  // - User enters new post information via the New Post page
  // - Data is sent to the server and the new post data is returned
  // - State is updated (courseID, courseData)
  // - SIDE EFFECT 5: Active state is updated to redirect the user from New Post to the new Post if postData exists

  // Request to create a new post with the given data
  const addPost = (data) => {

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
      .catch(() => {
        console.log("An error occurred. Check that the form is complete!");
      });
  };

  // Request to edit a postID with the given data
  const editPost = (postID, data) => {
    console.log("Updating post to:", JSON.stringify(data));
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
    const url = API.COMMENTS + "/"  + commentID + (liked ? "/unlike" : "/like");
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
      .then((res) => {
        setActive("Post", state.postID);
        console.log(res);
      })
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
        reloader: !state.reloader, // need this for deleting comments
        errors: null
      });
    } else {
      setState({
        ...state,
        active: selection,
        postID: null,
        postData: null,
        // reloader: !state.reloader
        errors: null
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

      {/* Loading Message (when active is null) */}
      {state.loading &&
        <div className="display-4 d-flex justify-content-center align-items-center h-100">
          Loading...
        </div>
      }

      {/* Login page */}
      {state.active === "Login" &&
        <Login
          onSubmit={fetchUserData}
          errors={state.errors}
          onRedirect={setActive}

          // props={state}
        />
      }

      {/* Login page */}
      {state.active === "Register" &&
        <Register
          onSubmit={registerUser}
          errors={state.errors}
          onRedirect={setActive}

          // props={state}
        />
      }

      {/* Show all user courses */}
      {state.active === "Home" &&
        <Home
          userData={state.userData}
          userCourses={state.userCourses}
          onClick={fetchCourseData}
          onRedirect={setActive}

          // props={state}
        />
      }

      {/* Create page */}
      {state.active === "Create" &&
        <Create
          userData={state.userData}
          onSubmit={createCourse}
          errors={state.errors}
          onRedirect={setActive}

          // props={state}
        />
      }

      {/* Join page */}
      {state.active === "Join" &&
        <Join
          userData={state.userData}
          onSubmit={joinCourse}
          errors={state.errors}
          onRedirect={setActive}

          // props={state}
        />
      }

      {/* Single course view */}
      {state.userData && state.userCourses && state.courseData &&
        <>

          {/* Nav Bar (requires userData, userCourses, courseData) */}
          <Nav
            onClick={setActive}
            active={state.active}
            viewTitle={`${state.courseData.name} > ${state.postID ? "Post @" + state.postID : state.active }`}
            courseName={state.courseData.name}
            userAvatar={state.userData.avatarID}
            userName={`${state.userData.firstName} ${state.userData.lastName}`}
          />

          <section className="app-containers">

            {/* All Posts */}
            <div className="app-left">

              {/* PostList is shown only if the user has a course selected */}
              {state.courseData &&
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
              }
            </div>

            {/* Current View */}
            <div className="app-right">
              <Main
                active={state.active}
                userData={state.userData}
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

        </>
      }

      {/* Test Controls */}
      <div className="test-controls mt-2">
        test controls:
        <Button text="Refresh DB" onClick={() => resetDB()} />
        {/* these may be broken lol
        <Button text="admin" onClick={() => setRole("admin")} />
        <Button text="owner" onClick={() => setRole("owner")} />
        <Button text="instructor" onClick={() => setRole("instructor")} />
        <Button text="student" onClick={() => setRole("student")} /> */}
        {/* current role: {state.role} */}
      </div>
      <DevData name="App" props={state} label={"State"} />
    </div>


  );
};

export default App;
