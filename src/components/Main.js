// import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
// import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Post from "./Post";
import PostForm from "./PostForm";
import Dashboard from "./Dashboard";
import Analytics from "./Analytics";
import "./Main.scss";

import DevData from "./DevData";

const Main = (props) => {

  Main.propTypes = {
    active: PropTypes.string,
    userData: PropTypes.object,
    courseData: PropTypes.object,
    postID: PropTypes.number,
    onEditBookmark: PropTypes.func,
    onAddPost: PropTypes.func,
    onEditPost: PropTypes.func,
    onDeletePost: PropTypes.func,
    onLikeComment: PropTypes.func,
    onAddComment: PropTypes.func,
    onEditComment: PropTypes.func,
    onDeleteComment: PropTypes.func,
    onTagToggle: PropTypes.func
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

  const post = getPostByID(props.courseData.posts, props.postID);

  const stats = props.courseData.analytics;

  ///////////////////////////////////////////////////////////////////

  return (
    <div className="Main">

      {/* TEMPORARY */}
      {props.active === "Dashboard" &&
        <DevData name={"Dashboard"} data={props} />
      }

      {props.active === "Post" &&
        <Post
          id={post.id}
          courseTags={props.courseData.tags}
          anonymous={post.anonymous}
          author={post.author_first_name ? `${post.author_first_name} ${post.author_last_name}` : null }
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
          onEditBookmark={props.onEditBookmark}
          onAddPost={props.onAddPost}
          onEditPost={props.onEditPost}
          onDeletePost={props.onDeletePost}
          onLikeComment={props.onLikeComment}
          onAddComment={props.onAddComment}
          onEditComment={props.onEditComment}
          onDeleteComment={props.onDeleteComment}
          onTagToggle={props.onTagToggle}
          userName={`${props.userData.first_name} ${props.userData.last_name}`}
        />
      }

      {props.active === "New Post" &&
        <PostForm
          userName={`${props.userData.first_name} ${props.userData.last_name}`}
          courseData={props.courseData}
          onAddPost={props.onAddPost}
        />
      }

      {props.active === "Dashboard" &&
        <Dashboard
          resolved={stats.num_resolved_questions}
          unresolved={stats.num_unresolved_questions}
        />
      }

      {props.active === "Analytics" && <Analytics />}

    </div>
  );
};

export default Main;
