// import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
// import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Post from "./Post";
import PostForm from "./PostForm";
import Home from "./Home";
import Join from "./Join";
import Create from "./Create";
import Manage from "./Manage";
import Dashboard from "./Dashboard";
import Info from "./Info";
import ManageCourse from "./ManageCourse";
import Access from "./Access";
import Analytics from "./Analytics";
import BackButton from "./BackButton";
import "./Main.scss";

import DevData from "./DevData";

const Main = (props) => {

  Main.propTypes = {
    // Active state
    active: PropTypes.string,
    status: PropTypes.string,
    statusMessage: PropTypes.string,
    errors: PropTypes.array,
    // Home view
    userData: PropTypes.object,
    userCourses: PropTypes.array,
    // Course view
    courseData: PropTypes.object,
    posts: PropTypes.array,
    // Post view
    postID: PropTypes.number,
    postData: PropTypes.object,

    // Create/Join course functions
    onCreateCourse: PropTypes.func,
    onJoinCourse: PropTypes.func,

    // Manage user enrolments functions
    onLeaveCourse: PropTypes.func,
    onViewCourse: PropTypes.func,

    // Manage course/settings functions
    onEditCourse: PropTypes.func,
    onDeleteCourse: PropTypes.func,
    onResetAccess: PropTypes.func,

    // Post functions
    onEditBookmark: PropTypes.func,
    onAddPost: PropTypes.func,
    onEditPost: PropTypes.func,
    onDeletePost: PropTypes.func,
    onLikeComment: PropTypes.func,
    onAddComment: PropTypes.func,
    onEditComment: PropTypes.func,
    onDeleteComment: PropTypes.func,

    onTagToggle: PropTypes.func,
    onRedirect: PropTypes.func
  };



  // const [state, setState] = useState({
  //   mainActive: props.active
  // });

  // console.log(props.active, state.mainActive, props.postID);

  // HELPER FUNCTIONS ///////////////////////////////////////////////

  // Return the post for the given postID
  const getPostByID = (posts, postID) => {
    if (postID) {
      return posts.filter(post => post.id === postID)[0];
    }
  };

  // VARIABLES //////////////////////////////////////////////////////

  // Home view

  // Course view
  const post = props.courseData ? getPostByID(props.posts, props.postID) : null;
  const stats = props.courseData ? props.courseData.analytics : null;

  ///////////////////////////////////////////////////////////////////

  return (
    <div className="Main">

      {/* Archived Warning */}
      {props.courseData && props.courseData.archived &&
        <div className="archived-message">
          <div>
            This course has been <span>archived</span>.
          </div>
          <div className="body">
            While you are free to continue contributing to its discussions, please note that they may no longer be monitored by the course instructors.
          </div>
        </div>
      }

      {/* Home View */}
      {props.active === "Home" &&
        <Home
          userData={props.userData}
          userCourses={props.userCourses}
          onRedirect={props.onRedirect}
        />
      }

      {/* Join View */}
      {props.active === "Join" &&
        <Join
          onSubmit={props.onJoinCourse}
          status={props.status}
          statusMessage={props.statusMessage}
          errors={props.errors}
          onRedirect={props.onRedirect}
        />
      }

      {/* Create View */}
      {props.active === "Create" &&
        <Create
          onSubmit={props.onCreateCourse}
          status={props.status}
          errors={props.errors}
          onRedirect={props.onRedirect}
        />
      }

      {/* Manage View */}
      {props.active === "Manage" &&
        <Manage
          userData={props.userData}
          userCourses={props.userCourses}
          onLeaveCourse={props.onLeaveCourse}
          onViewCourse={props.onViewCourse}
          status={props.status}
          errors={props.errors}
          onRedirect={props.onRedirect}
        />
      }

      {/* TEMPORARY */}
      {/* {props.active === "Manage" &&
        <DevData name={"Main"} props={props} />
      } */}

      {/* Dashboard View */}
      {props.active === "Dashboard" &&
        <Dashboard
          courseData={props.courseData}
          userData={props.userData}
          userRole={props.courseData.role}
          onRedirect={props.onRedirect}
          courseCode={props.courseData.course_code}
          courseName={props.courseData.name}
          analytics={props.courseData.analytics}
        />
      }

      {/* Info View */}
      {props.active === "Info" &&
        <Info
          active={props.active}
          courseData={props.courseData}
          onLeaveCourse={props.onLeaveCourse}
        />
      }

      {/* Manage Course View */}
      {props.active === "Manage Course" &&
        <ManageCourse
          courseData={props.courseData}
          onEditCourse={props.onEditCourse}
          onRedirect={props.onRedirect}
        />
      }

      {/* Access Codes View */}
      {props.active === "Access" &&
        <Access
          studentCode={props.courseData.secrets.student_access_code}
          instructorCode={props.courseData.secrets.instructor_access_code}
          onResetAccess={props.onResetAccess}
          onRedirect={props.onRedirect}
          isOwner={props.courseData.role === "owner"}
        />
      }

      {/* Analytics View */}
      {props.active === "Analytics" && <Analytics />}

      {/* New Post View */}
      {props.active === "New Post" &&
        <PostForm
          userName={`${props.userData.firstName} ${props.userData.lastName}`}
          userRole={props.courseData.role}
          courseData={props.courseData}
          onAddPost={props.onAddPost}
          onRedirect={props.onRedirect}
        />
      }

      {/* Post View */}
      {props.active === "Post" &&
        <Post
          id={post.id}
          courseTags={props.courseData.tags}
          anonymous={post.anonymous}
          author={post.author_first_name ? `${post.author_first_name} ${post.author_last_name}` : null }
          authorRole={post.role}
          bestAnswer={post.best_answer}
          body={post.body}
          pinned={post.pinned}
          bookmarked={post.bookmarked}
          comments={post.comments}
          createdAt={post.created_at}
          lastModified={post.last_modified}
          pinnable={post.pinnable}
          editable={post.editable}
          tags={post.tags}
          title={post.title}
          authorID={post.author_id}
          views={post.views}
          edits={post.edits}
          viewed={post.viewed}
          onEditBookmark={props.onEditBookmark}
          onAddPost={props.onAddPost}
          onEditPost={props.onEditPost}
          onDeletePost={props.onDeletePost}
          onLikeComment={props.onLikeComment}
          onAddComment={props.onAddComment}
          onEditComment={props.onEditComment}
          onDeleteComment={props.onDeleteComment}
          onTagToggle={props.onTagToggle}
          userName={`${props.userData.firstName} ${props.userData.lastName}`}
          userID={props.userData.userID}
          userRole={props.courseData.role}
        />
      }

    </div>
  );
};

export default Main;
