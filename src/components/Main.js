import { useState, useEffect } from "react";
import "./Main.scss";
import Post from "./Post";
import Dashboard from "./Dashboard";
import Analytics from "./Analytics";
import PropTypes from "prop-types";

// Receiving: props.active
// TODO:
// If showing "post", props should include props.post (specific data for the selected post)
// If showing "dashboard", props should include props.course (ALL data for the course, including posts, users, etc.)
// If showing "analytics", props should include props.course (ALL data for the course, including posts, users, etc.)
// props should just include props.course for all three ?

const Main = (props) => {

  Main.propTypes = {
    active: PropTypes.string.isRequired,
    courseData: PropTypes.object.isRequired,
    postID: PropTypes.number,
    onEditPost: PropTypes.func,
    onDeletePost: PropTypes.func,
    onEditComment: PropTypes.func
  };

  // Get post for the given postID
  const getPostByID = (posts, postID) => {
    if (postID) {
      return posts.filter(post => post.id === postID)[0];
    }
  };

  const post = getPostByID(props.courseData.posts, props.postID);

  // Only one main component can active at a given time

  return (
    <div className="Main">
      {props.active === "Post" &&
        <Post
          id={post.id}
          courseTags={props.courseData.tags}
          anonymous={post.anonymous}
          author={post.author_first_name ? `${post.author_first_name} ${post.author_last_name}` : null }
          bestAnswer={post.best_answer}
          body={post.body}
          bookmarked={post.bookmarked}
          comments={post.comments}
          createdAt={post.created_at}
          lastModified={post.last_modified}
          editable={post.editable}
          tags={post.tags}
          title={post.title}
          userID={post.user_id}
          views={post.views}
          onEditPost={props.onEditPost}
          onDeletePost={props.onDeletePost}
          onEditComment={props.onEditComment}
        />
      }
      {props.active === "Dashboard" && <Dashboard />}
      {props.active === "Analytics" && <Analytics />}
    </div>
  );
};

export default Main;
