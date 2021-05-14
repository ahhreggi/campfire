import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PostListItem from "./PostListItem";

const PostListCategory = (props) => {
  PostListCategory.propTypes = {
    posts: PropTypes.array,
    onClick: PropTypes.func,
    postID: PropTypes.number
  };

  const [state, setState] = useState({
    postID: props.postID,
  });

  useEffect(() => {
    setState({ postID: props.postID });
    // console.log("Cat:", props.postID);
  }, [props.postID]);

  const selectPost = (postID) => {
    setState({ postID: postID });
    props.onClick(postID);
  };

  // Create the PostListCategoryItems
  const categoryItems = props.posts.map(post => {
    // Get the total number of comments + replies of a post
    const numComments = post.comments
      .map(comment => 1 + comment.replies.length)
      .reduce((a, b) => a + b, 0);
    // Check if a student has commented on the post
    const showStudentBadge = post.comments.filter(comment => comment.role === "student").length > 0;
    // Check if an instructor has commented on the post
    const showInstructorBadge = post.comments.filter(comment => comment.role === "instructor").length > 0;
    return (
      <PostListItem
        key={post.id}
        id={post.id}
        title={post.title}
        body={post.body}
        pinned={post.pinned}
        bookmarked={post.bookmarked}
        bestAnswer={post.best_answer}
        tags={post.tags}
        views={post.views}
        comments={numComments}
        showStudentBadge={showStudentBadge}
        showInstructorBadge={showInstructorBadge}
        onClick={selectPost}
        selectedPostID={state.postID}
      />
    );
  });

  return (
    <div className="PostListCategory list">
      {categoryItems}
    </div>
  );
};

export default PostListCategory;
