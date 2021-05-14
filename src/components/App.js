import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory } from "react-router-dom";
import { useNavigate } from "@reach/router";
import axios from "axios";
import Nav from "./Nav";
import PostList from "./PostList";
import Main from "./Main";
import Button from "./Button";
import Login from "./Login";
import Home from "./Home";
import DevData from "./DevData";
import Register from "./Register";
import Create from "./Create";
import Join from "./Join";
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

  });

  // Show a loading screen if active is null
  useEffect(() => {
    if (state.active === null) {
      setState({ ...state, loading: true });
    } else {
      setState({ ...state, loading: false });
    }
  }, [state.active]);

  //////////////////

  // Testing purposes
  const setRole = (role) => {
    console.log("Setting auth token to", role);
    setState({ ...state, userData: { ...state.userData, token: tokens[role] }, role: role });
  };

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

    // If a role is provided, use its token, otherwise use state.userData.token
    const params = (method + " " + url + (id ? `/${id}` : ""));
    const token = role ? tokens[role] : (state.userData ? state.userData.token : null);

    console.log("-".repeat(50));
    console.log("🔥", params);
    console.log("🔥 STATE TOKEN:", token);
    if (data) {
      console.log("🔥 DATA SENT:", data);
    }

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

  const setAppData = (data, type) => {
    if (type === "post") {
      setState({
        ...state,
        postData: data,
        postID: data.id,
        reloader: !state.reloader
      });
    } else if (type === "userData") {
      setState({ ...state, userData: data });
    } else if (type === "userCourses") {
      setState({ ...state, userCourses: data, active: "Home" });
    } else if (type === "courseData") {
      setState({
        ...state,
        courseID: data.id,
        courseData: data,
        postData: data ? getPostByID(data.posts, state.postID) : null,
        posts: data ? data.posts : null
      });
    }
  };

  // Login/retrieve data for an existing user and redirect to the dashboard of a course
  // redirect to page with all of the user's courses or the course page of most recent?
  // have this api call include an array of the user's course IDs already to display in the nav/login landing
  // e.g., userData.courses = [ { id: course_id, name: course_name }]

  const fetchUserData = (data) => {
    request("POST", API.LOGIN, null, { email: data.email, password: data.password })
      .then((userData) => {

        // Login successful
        if (userData) {

          // Set userData in state
          setAppData(userData, "userData");

          // Fetch all of the user's courses (active -> Home)
          // --> Done via useEffect (userData goes from null -> object)

          // Login failed
        } else {
          console.log("❌ fetchUserData failed!");
        }
      });
  };

  // Detect userData changes
  useEffect(() => {
    console.log("userData:", state.userData);
    // If user data is valid, fetch all of the user's courses
    // Maybe check that state.active was previously Login?
    if (state.userData) {
      console.log("You are now logged in! Fetching your courses...");
      fetchUserCourses();

      // No user data
    } else {
      console.log("You are now logged out!");
    }

  }, [state.userData]);

  // Fetch all of the current user's courses
  const fetchUserCourses = () => {
    request("GET", API.COURSES)
      .then((userCourses) => {

        // User courses retrieved
        if (userCourses) {

          // Set userCourses in state, active to Home
          setAppData(userCourses, "userCourses");

          // Display the user's dashboard with all of their courses
          // --> Done via useEffect (userCourses goes from null -> array)

        // Failed to retrieve user courses
        } else {
          console.log("❌ fetchUserCourses failed!");

        }
      });
  };

  // Detect userCourses changes
  useEffect(() => {
    // Nothing to do here.. user can pick a course or join/create
    // If the user has no courses, their only options are to join/create
    console.log("userCourses:", state.userCourses);
  }, [state.userCourses]);

  // Fetch course data from the server once a user selects one from the Home view
  // This is also runs in general whenever the course gets updated from within the single-course view!
  const fetchCourseData = (courseID) => {
    request("GET", API.COURSES, courseID)
      .then((courseData) => {

        // User selected course retrieved
        if (courseData) {

          // Set courseData in state
          setAppData(courseData, "courseData");

          // Display the course page
          // --> Done via useEffect (when courseData goes from null -> object, change active view to Dashboard)

          // Failed to retrieve course data
        } else {
          console.log("❌ fetchUserCourses failed!");

        }

      });
  };

  // Detect courseData changes
  useEffect(() => {
    // If courseData changes while the active view is Home, change it to dashboard
    // If the active view is not Dashboard (meaning the user selected a course from within the course or another course), keep it as is
    // Use another useEffect to reload courseData in those cases (when courseData.id changes for example)
    // This is so that courseData does not cause the user to leave a post if all they were doing was updating it or something

    // If courseData changes to a valid object
    if (state.courseData) {

      // If the current active view is Home, switch to Dashboard
      if (state.active === "Home") {
        setState({ ...state, active: "Dashboard" });
      }

    }

  }, [state.courseData]);



  // Register a new user account
  const registerUser = (data) => {
    request("POST", API.REGISTER, null, { firstName: data.firstName, lastName: data.lastName, email: data.email, password: data.password })
      .then((userData) => {
        // setState({ ...state, user: userData, token: userData.token, userCourses: [] });
      // redirect to create/join page since the user has no courses yet
      })
      .catch((err) => console.log(err));
    // errors: user is already logged in or the email provided is taken
    // have the error response indicate the error so it can be displayed to the user
  };


  // Join an existing course via access code and redirect to it
  const joinCourse = (data) => {
    request("POST", API.JOIN, null, { accessCode: data.accessCode })
      .then((data) => {
      // need this to give the courseID, currently gives course URL
        const courseID = parseInt(data.redirect_to.split("/")[1]);
        fetchCourseData(courseID);
      // redirect to course page
      // loading -> courseData becomes !== null and displays dashboard/main app
      })
      .catch((err) => console.log(err));
  };

  // Create a new course and redirect to it
  const createCourse = (data) => {
    request("POST", API.CREATE, null, { name: data.name, description: data.description })
      .then((data) => {
        // need this to give the courseID, currently gives course URL
        const courseID = parseInt(data.redirect_to.split("/")[1]);
        fetchCourseData(courseID);
      });
  };

  ///////////////////////////////////////////////////////////////////

  // Edit the user's bookmark for the given postID
  const editBookmark = (postID, bookmarked) => {
    axios({
      method: bookmarked ? "DELETE" : "POST",
      url: bookmarked ? API.BOOKMARKS : API.BOOKMARKS,
      headers: {
        "Authorization": state.userData.token
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
        reloader: !state.reloader // need this for deleting comments
      });
    } else {
      setState({
        ...state,
        active: selection,
        postID: null,
        postData: null,
        // reloader: !state.reloader
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
          props={state}
          onSubmit={fetchUserData}
        />
      }

      {/* Show all user courses */}
      {state.active === "Home" &&
        <Home
          userData={state.userData}
          userCourses={state.userCourses}
          onClickCourse={fetchCourseData}

          props={state}
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
