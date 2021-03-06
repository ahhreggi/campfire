import { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./Nav";
import CourseList from "./CourseList";
import PostList from "./PostList";
import Main from "./Main";
import Register from "./Register";
import Login from "./Login";
import DevData from "./DevData";

import "./App.scss";

/////////////////////////////////////////////////////////////////////

const API = {

  RESET: "/api/debug/reset_db",

  COURSES: "/api/courses",

  POSTS: "/api/posts",

  BOOKMARKS: "/api/bookmarks",

  COMMENTS: "/api/comments",

  USERS: "/api/user",

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

    // "Login", "Register" => REQ: none
    // "Home", "Create", "Join" => REQ: userData, userCourses
    // "Dashboard", "Analytics", "Post", "New Post" => REQ: userData, userCourses, courseData, courseID, posts
    active: "Login", // view controller, default landing page is the Login screen

    courseID: null,
    courseData: null, // all data for the current courseID
    posts: null, // all posts from courseData

    postID: null, // a post ID or null if viewing dashboard/analytics
    postData: null, // post data for the current post ID or null if postID is null (viewing a non-Post page)

    selectedTags: [],

    loading: true,

    status: null,
    errors: null // e.g. ["Invalid username/password"] // typically should have only 0 or 1 item at any given time

  });

  // Active view controller
  useEffect(() => {
    // When clicking the Dashboard from within a course, re-fetch and update courseData
    // Useful for actions that re-direct to the Dashboard and need to update courseData such as deleting a post
    if (state.active === "Dashboard" && state.courseData) {
      fetchCourseData(state.courseID, null, null);
      // Show a loading screen if active is null (e.g. resetDB())
    } else if (state.active === "Home") {
      setState({ ...state, courseID: null, courseData: null, postID: null, posts: null });
    } else if (!state.active) {
      setState({ ...state, loading: true });
      // Remove the loading screen if an active view exists
    } else {
      setState({ ...state, loading: false });
    }
  }, [state.active]);

  // SERVER-REQUESTING FUNCTIONS ////////////////////////////////////

  // Reset the database (used for the Refresh DB dev tools button)
  // const resetDB = () => {
  //   console.log("Re-seeding database as admin...");
  //   setState({});
  //   request("GET", API.RESET, null, null, "admin")
  //     .then(() => {
  //       setTimeout(() => {
  //         window.location.href = "/";
  //       }, 1000);
  //     });
  // };

  // Create an axios request
  // Sample usage:
  //   request("POST", "/api/example", 5, { key: "value" }) => POST /api/example/5 with the given data
  //     .then((data) => {
  //       if (data) => {
  //         console.log("Response data received! Data:", data)
  //       } else {
  //         console.log("No response from server, can be either intentional or an error occurred.")
  //       };
  const request = async(method, url, id = null, data = null) => {

    // If a role is provided, use its token, otherwise use state.userData.token
    // const params = (method + " " + url + (id ? `/${id}` : ""));
    const token = state.userData ? state.userData.token : null;

    // console.log("\n".repeat(10));
    // console.log("????", params);
    // console.log("???? STATE TOKEN:", token);
    if (data) {
      // console.log("???? DATA SENT:", data);
    }
    // console.log("\n".repeat(2));

    return axios({
      method: method,
      url: url + (id ? `/${id}` : ""),
      headers: {
        "Authorization": token
      },
      data
    })
      .then(res => {
        // console.log("?????? SERVER RESPONSE:", res.data);
        return res.data;
      })
      .catch(() => {
        return;
      });
  };

  // Set the application data
  const setAppData = (data, type, newPostID, newPostData, newActive, newCourseData, newUserCourses) => {
    if (type === "userData") {
      const active = newActive !== undefined ? newActive : state.active;
      setState({ ...state, userData: data, active: active, errors: null });
    } else if (type === "userCourses") {
      let active = newActive !== undefined ? newActive : state.active;
      let courseID = state.courseData ? state.courseData.id : null;
      let posts = state.courseData ? state.courseData.posts : null;
      let courseData = newCourseData !== undefined ? newCourseData : state.courseData;

      // If new course data is provided (e.g., a new course was created), update courseData, courseID, posts, and active
      if (newCourseData) { // can also check if newActive === "Dashboard"
        courseID = newCourseData.id;
        posts = newCourseData.posts; // technically this can be empty
      }
      // Redirect to Home after Login, Register
      if (state.active === "Login" || state.active === "Register") {
        active = "Home";
      } else if (state.active === "Join") {
        active = "Dashboard";
      }
      setState({ ...state, userCourses: data, active: active, courseData: courseData, courseID: courseID, posts: posts });
    } else if (type === "courseData") {
      // If new values for postID and postData are provided, use them
      const postID = newPostID !== undefined ? newPostID : state.postID;
      const postData = newPostData !== undefined ? newPostData : state.postData;
      const active = newActive !== undefined ? newActive : state.active;
      const userCourses = newUserCourses !== undefined ? newUserCourses : state.userCourses;
      setState({
        ...state,
        courseID: data.id,
        courseData: data,
        postID: postID,
        postData: postData,
        posts: data ? data.posts : null,
        active: active,
        userCourses: userCourses
      });
    } else if (type === "courseReset") {
      setState({
        userData: state.userData,
        userCourses: state.userCourses,
        active: "Home"
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
  // - SIDE EFFECT 1: User courses are fetched from the server (fetchUserCourses)
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
          // console.log("??? registerUser failed!");
          setState({ ...state, errors: ["Email already in use"] });
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
          // console.log("??? fetchUserData failed!");
          setState({ ...state, errors: ["Invalid username/password"] });
        }
      });
  };

  // SIDE EFFECT 1: User courses are fetched from the server if userData exists
  useEffect(() => {
    if (state.userData) {
      if (state.active !== "Account") {
        fetchUserCourses();
      } else {
        setActive("Home");
      }
    }
  }, [state.userData]);

  // Fetch the current user's courses
  const fetchUserCourses = (newCourseData, newActive) => {
    request("GET", API.COURSES)
      .then((userCourses) => {
        if (userCourses) {
          let active = newActive !== undefined ? newActive : "Dashboard";
          const courseData = newCourseData !== undefined ? newCourseData : state.courseData;
          setAppData(userCourses, "userCourses", null, null, active, courseData);
        } else {
          // console.log("??? fetchUserCourses failed!");
          setState({ ...state, errors: ["Failed to retrieve user courses"]});
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
  const fetchCourseData = (courseID, newPostID, newPostData, newActive) => {
    request("GET", API.COURSES, courseID)
      .then((courseData) => {
        if (courseData) {
          setAppData(courseData, "courseData", newPostID, newPostData, newActive);
        } else {
          // console.log("??? fetchCourseData failed!");
        }
      });
  };

  // SIDE EFFECT 2: Active state is updated to redirect the user from Home to the Dashboard if courseData exists
  // SIDE EFFECT 3: userCourses is updated if courseData exists and is not yet in userCourses (happens when creating/joining a course)
  useEffect(() => {
    // If courseData changes and exists
    if (state.courseData) {
      const origins = ["Home", "Create", "Join", "Manage", "About", "Help", "Account"];
      // Redirect to Dashboard if coming from a non-course view
      if (origins.includes(state.active)) {
        // If coming from the Create or Join page, add the new course data to userCourses
        let userCourses = [ ...state.userCourses ];
        if (state.active === "Create" || state.active === "Join") {
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
      // If courseData changes to null
    } else {
      // If userData and userCourses still exist, reset all other courseData-reliant states and redirect to Home
      // E.g. User remains logged in but exits a course page and returns to the Home page
      if (state.userData && state.userCourses) {
        setState({ ...state, courseID: null, posts: null, postID: null, postData: null, selectedTags: [], active: "Home" });
        // Otherwise, reset state and redirect to Login
      }
      // If userData and userCourses are also null (user logged out), then state is basically {}
      // The user will be re-directed to Login automatically
      // This also happens when resetDB() is run (state is set to {} with active = null to show Loading screen)
    }
  }, [state.courseData]);

  // COURSE CREATION ////////////////////////////////////////////////

  // BASIC USER ROUTE
  // - User enters new course information via the Create page
  // - Data is sent to the server and the new course data is returned
  // - State is updated (courseID, courseData) => needs to update userCourses before redirecting!
  // - SIDE EFFECT 2: Active state is updated to redirect the user from Create to the Dashboard if courseData exists
  // - SIDE EFFECT 4: User courses are fetched from the server if active changes from "Create" to "Dashboard"

  // Create a new course and redirect to it
  const createCourse = (data) => {
    request("POST", API.CREATE, null, data)
      .then((courseData) => {
        if (courseData) {
          // Fetch userCourses and update userCourses, courseData, courseID, posts, and active (Home -> Dashboard) in state
          fetchUserCourses(courseData);
        } else {
          // console.log("??? createCourse failed!");
        }
      });
  };

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

          // If the data contains a message, the user is already enrolled in the course
          if (courseData.message) {
            setState({ ...state, errors: ["You are already enrolled in this course"] });
            // Otherwise, enrol normally
          } else {
            setState({ ...state, status: "success", statusMessage: courseData.name });
            const newCourse = {
              id: courseData.id,
              name: courseData.name,
              description: courseData.description,
              "course_code": courseData.course_code,
              "created_at": courseData.created_at,
              "owner_name": courseData.owner_name,
              userID: courseData.userID,
              role: courseData.role,
              "join_date": courseData.join_date,
              archived: courseData.archived,
              active: courseData.active,
              analytics: courseData.analytics
            };
            setTimeout(() => {
              setAppData(courseData, "courseData", null, null, "Dashboard", undefined, [ ...state.userCourses, newCourse ]);
            }, 1500);
          }
        } else {
          // console.log("??? joinCourse failed!");
          setState({ ...state, errors: ["Invalid access code"] });
        }
      });
  };

  // COURSE UNENROLMENT ////////////////////////////////////////////

  // BASIC USER ROUTE
  // - User visits the Manage page and presses UNENROL within a list of their courses
  // - User is prompted to confirm unenrolment if they are not the owner (they may only delete the course)
  // - TODO: Pass ownership of a course?
  // - The data is deleted from the server, no response data is returned
  // - State is updated (userCourses), user stays on the Manage page

  // Unenrol the user from the given courseID
  const leaveCourse = (courseID) => {
    request("POST", API.COURSES + "/" + courseID + "/leave")
      .then(() => fetchUserCourses(null, "Manage"));
  };

  // SIDE EFFECT 8: If userData changes while active is "Manage", stay on Manage

  // EDIT A COURSE //////////////////////////////////////////////////

  // Edit a courseID with the given data
  const editCourse = (courseID, data, mode) => {
    request("PATCH", API.COURSES, courseID, data)
      // .then(() => fetchCourseData(state.courseID));
      .then((courseData) => {
        if (courseData) {
          // Fetch userCourses and update userCourses, courseData, courseID, posts, and active (Home -> Dashboard) in state
          if (mode !== "manage") {
            fetchUserCourses(courseData);
          }
          fetchCourseData(courseID);
        } else {
          // console.log("??? editCourse failed!");
        }
      });
  };

  // REMOVE USER FROM COURSE ////////////////////////////////////////

  // Remove a user from a course
  const removeUser = (courseID, userID) => {
    const data = { roles: { [userID]: null } };
    request("PATCH", API.COURSES, courseID, data)
      .then((res) => {
        if (res) {
          fetchCourseData(courseID);
        }
      });
  };

  // Delete a course by ID, then redirect to Home
  const deleteCourse = (courseID) => {
    request("DELETE", API.COURSES, courseID)
      .then(() => {
        // setActive("Home")
        fetchUserCourses(null, "Home");
      });
  };



  // Reset the student and instructor access codes of a course
  const resetAccessCodes = (courseID) => {
    request("POST", API.COURSES + "/" + courseID + "/resetAccessCodes")
      .then(() => fetchCourseData(state.courseID));
  };

  // BOOKMARK A POST ////////////////////////////////////////////////

  // BASIC USER ROUTE
  // - User selects a course from the post list
  // - User presses the star icon to toggle the bookmark status of the post
  // - State is updated (courseID, courseData)
  // - The post is immediately moved to the appropriate category within the post list

  // Toggle the user's bookmark for the given postID
  const editBookmark = (postID, bookmarked) => {
    const method = bookmarked ? "DELETE" : "POST";
    request(method, API.BOOKMARKS, null, { postID })
      .then(() => fetchCourseData(state.courseID));
  };

  // VIEW A POST ////////////////////////////////////////////////////

  // BASIC USER ROUTE
  // - User's first unique visit to a post updates its view count by 1

  // Add a unique view to the given postID
  const viewPost = (postID) => {
    request("POST", API.POSTS, postID + "/view");
  };

  // If postID changes, exists, and the user has not previously visited the post before, add a unique view
  useEffect(() => {
    if (state.postID) {
      const post = getPostByID(state.posts, state.postID);
      if (!post.viewed && state.active !== "New Post") {
        viewPost(state.postID);
        setTimeout(() => {
          fetchCourseData(state.courseData.id, state.postID, getPostByID(state.courseData.posts, state.postID));
        }, 100);
      }
    }
  }, [state.postID]);

  // CREATE A POST //////////////////////////////////////////////////

  // BASIC USER ROUTE
  // - User presses the New Post button in the post list
  // - User enters new post information via the New Post page
  // - Data is sent to the server and the new post data is returned
  // - State is updated (courseID, courseData)
  // - SIDE EFFECT 5: Active state is updated to redirect the user from New Post to the new Post if postData exists

  // Create a new post with the given data
  const addPost = (data) => {
    request("POST", API.POSTS, null, data)
      .then((data) => {
        const postData = data[0];
        if (postData) {
          const newCourseData = {
            ...state.courseData,
            posts: [ ...state.posts, postData ]
          };
          // Update courseData, and provide the new postID and postData to allow redirecting
          setAppData(newCourseData, "courseData", postData.id, postData);
          // SIDE EFFECT 7: If postData and postID change to non-null values while the active view is "New Post", change it to "Post"
        } else {
          // console.log("??? addPost failed!");
          setState({ ...state, errors: ["An error occurred while trying to create the post"] });
        }
      });
  };

  // SIDE EFFECT 7: If postData and postID change to non-null values while the active view is "New Post", change it to "Post"
  useEffect(() => {
    if (state.postData && state.postID && state.active === "New Post") {
      setActive("Post", state.postID, getPostByID(state.posts, state.postID));
    }
  }, [state.postData]);

  // EDIT A POST //////////////////////////////////////////////////////

  // BASIC USER ROUTE
  // - User presses the edit button of a post they authored (or they are an instructor)
  // - User edits the data and saves the changes
  // - User can also immediately toggle the pin status of a post (if they are an instructor)
  // - Data is sent to the server and the new post data is returned
  // - State is updated (courseID, courseData, postID, postData, posts)

  // Edit a postID with the given data
  const editPost = (postID, data) => {
    request("PATCH", API.POSTS, postID, data)
      .then(() => fetchCourseData(state.courseID));
  };

  // DELETE A POST //////////////////////////////////////////////////

  // BASIC USER ROUTE
  // - User presses the delete button of a post they authored (or they are an instructor+)
  // - User confirms the delete
  // - The data is deleted from the server, no response data is returned
  // - State is updated (courseID, courseData, postID, postData, posts)

  // Delete a post by ID, then redirect to Dashboard
  const deletePost = (postID) => {
    request("DELETE", API.POSTS, postID)
      .then(() => setActive("Dashboard"));
  };

  // LIKE A COMMENT /////////////////////////////////////////////////

  // BASIC USER ROUTE
  // - User press the like/unlike button of a comment
  // - The data sent is determined by the current value (to set it to the opposite)
  // - Data is sent to the server, no response data is returned
  // - State is updated (courseID, courseData, postID, postData, posts)
  // - If the user is an instructor, it counts as an endorsement, instead

  // Toggle a user's like on a comment with the given ID
  const likeComment = (commentID, liked) => {
    const url = API.COMMENTS + "/"  + commentID + (liked ? "/unlike" : "/like");
    request("POST", url)
      .then(() => fetchCourseData(state.courseID));
  };

  // ADD A COMMENT //////////////////////////////////////////////////

  // VALIDATION
  // - Attempting to submit a comment with no body displays an error

  // BASIC USER ROUTE
  // - User adds a comment to a post, or a reply to a comment
  // - Data is sent to the server, no response data is returned
  // - State is updated (courseID, courseData, postID, postData, posts)

  // Add a comment with the given data
  const addComment = (data) => {
    request("POST", API.COMMENTS, null, data)
      .then(() => fetchCourseData(state.courseID));
  };

  // EDIT A COMMENT /////////////////////////////////////////////////

  // VALIDATION
  // - Attempting to edit a comment to have no body displays an error

  // BASIC USER ROUTE
  // - User edits a comment to a post, or a reply to a comment
  // - User confirms the changes
  // - Data is sent to the server, no response data is returned
  // - State is updated (courseID, courseData, postID, postData, posts)

  // Edit a comment by ID with the given data
  const editComment = (commentID, data) => {
    request("PATCH", API.COMMENTS, commentID, data)
      .then(() => fetchCourseData(state.courseID));
  };

  // DELETE A COMMENT ///////////////////////////////////////////////

  // BASIC USER ROUTE
  // - User presses the delete button of a comment/reply they authored (or they are an instructor+)
  // - User confirms the delete
  // - The data is deleted from the server, no response data is returned
  // - State is updated (courseID, courseData, postID, postData, posts)

  // Delete a comment by ID
  const deleteComment = (commentID) => {
    request("DELETE", API.COMMENTS, commentID)
      .then(() => fetchCourseData(state.courseID));
  };

  // EDIT A USER ////////////////////////////////////////////////////

  // BASIC USER ROUTE
  // - User edits and saves changes to their info via the Account page
  // - Data is sent to the server and the new user data is returned
  // - State is updated (userData), a success message is displayed

  // Edit a user with the given data
  const editUser = (data) => {
    request("PATCH", API.USERS, null, data)
      .then((userData) => {
        const newUserData = { ...state.userData, ...userData };
        setState({ ...state, userData: newUserData });
      });
  };

  // STATE-AFFECTING FUNCTIONS //////////////////////////////////////

  // Return true if the given active view requires courseData
  const requiresCourseData = (active) => {
    const dest = ["Dashboard", "Analytics", "Post", "New Post"];
    return dest.includes(active);
  };

  // Change the active view to "Dashboard", "Analytics", "New Post", "Post" (requires postID) and refresh course data
  const setActive = (selection, postID = null, postData = null) => {
    if (selection === "Logout") {
      setState({ active: "Login" });
    } else if (selection === "GitHub") {
      window.location.href = "https://github.com/ahhreggi/campfire";
    } else if (selection === "Post") {
      // const newPostData = postData !== undefined ? postData : getPostByID(state.posts, state.postID);
      const newPostData = postData !== undefined ? postData : getPostByID(postID, state.posts);
      setState({
        ...state,
        active: selection,
        postID: postID,
        postData: newPostData,
        errors: null
      });
    } else if (selection === "Home" && requiresCourseData(state.active)) {
      fetchUserCourses(null, "Home");
    } else {
      setState({
        ...state,
        active: selection,
        postID: null,
        postData: null,
        errors: null
      });
    }
  };

  // Update the selected tags dynamically as the user toggles them
  // If only is set to true, only the given tag will be selected
  const updateSelectedTags = (tag, only = false) => {
    let target;
    if (tag === "resolved") {
      target = { id: -1, name: "RESOLVED" };
    } else if (tag === "unresolved") {
      target = { id: -2, name: "UNRESOLVED" };
    } else {
      target = tag;
    }
    if (only) {
      setState({ ...state, selectedTags: [target] });
    } else {
      const selected = hasTag(state.selectedTags, target.id);
      if (selected) {
        const updatedTags = state.selectedTags.filter(sTag => sTag.id !== target.id);
        setState({ ...state, selectedTags: updatedTags });
      } else {
        const updatedTags = [ ...state.selectedTags, target];
        setState({ ...state, selectedTags: updatedTags });
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
        />
      }

      {/* Register page */}
      {state.active === "Register" &&
        <Register
          onSubmit={registerUser}
          errors={state.errors}
          onRedirect={setActive}
        />
      }

      {/* Single course view */}
      {state.userData && state.userCourses &&
        <>

          {/* Nav Bar (requires userData, userCourses, courseData) */}
          {state.userData && state.userCourses &&
            <Nav
              onRedirect={setActive}
              active={state.active}
              courseData={state.courseData}
              userAvatar={state.userData.avatarID}
              userName={`${state.userData.firstName} ${state.userData.lastName}`}
              userRole={state.courseData ? state.courseData.role : null}
            />
          }

          <section className="app-containers">

            {/* All Posts */}
            <div className="app-left">

              {/* PostList is shown only if the user has a course selected */}
              {state.courseData &&
                <PostList
                  active={state.active}
                  userID={state.userData.userID}
                  tags={state.courseData.tags}
                  posts={state.posts}
                  onClick={(postID) => setActive("Post", postID)}
                  selectedPostID={state.postID}
                  selectedTags={state.selectedTags}
                  onTagToggle={updateSelectedTags}
                  onTagClear={clearSelectedTags}
                  onRedirect={setActive}
                />
              }

              {!state.courseData && state.userCourses && state.userData &&
                <CourseList
                  active={state.active}
                  userCourses={state.userCourses}
                  onClick={fetchCourseData}
                />
              }

            </div>

            {/* Current View */}
            <div className="app-right">
              <Main
                // Active state
                active={state.active}
                status={state.status}
                statusMessage={state.statusMessage}
                errors={state.errors}

                // Home view
                userData={state.userData}
                userCourses={state.userCourses}

                // Course view
                courseData={state.courseData}
                posts={state.posts}

                // Post view
                postID={state.postID}
                postData={state.postData}

                // Edit user functions
                onEditUser={editUser}

                // Create/Join course functions
                onCreateCourse={createCourse}
                onJoinCourse={joinCourse}

                // Manage user enrolments functions
                onLeaveCourse={leaveCourse}
                onViewCourse={fetchCourseData}

                // Manage course/settings functions
                onEditCourse={editCourse}
                onDeleteCourse={deleteCourse}
                onResetAccess={resetAccessCodes}
                onRemoveUser={removeUser}

                // Post functions
                onEditBookmark={editBookmark}
                onAddPost={addPost}
                onEditPost={editPost}
                onDeletePost={deletePost}
                onAddComment={addComment}
                onLikeComment={likeComment}
                onEditComment={editComment}
                onDeleteComment={deleteComment}

                onTagToggle={updateSelectedTags}
                onRedirect={setActive}
              />
            </div>

          </section>

          <footer className="app-footer"></footer>

        </>
      }

      {/* See index.scss */}
      <div className="dev-tools pt-5">
        {/* Dev Data Display */}
        {state.userData && state.userData.userID === 1 && <DevData name="App" props={state} label={"State"} />}
      </div>


    </div>


  );
};

export default App;
