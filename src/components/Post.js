import { useState } from "react";
import "./Post.scss";
import Bookmark from "./Bookmark";
import Button from "./Button";
import PostForm from "./PostForm";
import CommentList from "./CommentList";
import edit from "../images/icons/edit.png";
import trash from "../images/icons/trash.png";
import eye from "../images/icons/eye.png";
import comment from "../images/icons/comment.png";
import PropTypes from "prop-types";

// Receiving: props.post => contains all data for a specific post

const Post = (props) => {

  const [state, setState] = useState({
    showForm: false,
    title: props.title,
    body: props.body
  });

  Post.propTypes = {
    id: PropTypes.number,
    anonymous: PropTypes.bool,
    author: PropTypes.string,
    bestAnswer: PropTypes.number,
    body: PropTypes.string,
    bookmarked: PropTypes.bool,
    comments: PropTypes.array,
    createdAt: PropTypes.string,
    lastModified: PropTypes.string,
    editable: PropTypes.bool,
    tags: PropTypes.array,
    title: PropTypes.string,
    userID: PropTypes.number,
    views: PropTypes.number,
    onEditComment: PropTypes.func
  };

  const toggleForm = () => {
    console.log(`${state.showForm ? "hiding post form" : "showing post form"}`);
    setState({ ...state, showForm: !state.showForm });
  };

  const deletePost = () => {
    console.log("clicked DELETE post button");
  };

  const tags = props.tags.map(tag => {
    return (
      <Button
        key={tag.id}
        text={tag.name}
        styles="tag"
      />
    );
  });

  const modifiedMsg = props.createdAt !== props.lastModified ? `(last modified: ${props.lastModified})` : "";

  let authorName = props.anonymous ? "Anonymous" : props.author;
  // If a post is anonymous, props.author will only be available if the current user is an instructor/admin
  if (props.anonymous && props.author) {
    authorName = props.author + " (Anonymous to students)";
  }

  const numComments = props.comments
    .map(comment => 1 + comment.replies.length)
    .reduce((a, b) => a + b, 0);

  return (
    <div className="Post">
      <div className="status">
        <div className={`resolution ${props.bestAnswer ? "resolved" : "unresolved"}`}>
          {props.bestAnswer && "RESOLVED"}
          {!props.bestAnswer && "UNRESOLVED"}
        </div>
        <div className="counters">
          <span className="views">
            <img src={eye} alt="views" />
            {props.views}
          </span>
          <span className="comments">
            <img src={comment} alt="comments" />
            {numComments}
          </span>
        </div>
      </div>
      <div className="header">
        <span className="bookmark">
          <Bookmark bookmarked={props.bookmarked} />
        </span>
        {props.title}
      </div>
      <div className="subheader">
        Submitted by <span className="author">{authorName}</span> on {props.createdAt} {modifiedMsg}
      </div>
      <div className="tags">
        {tags}
      </div>
      <hr />
      <div className="body">
        {props.body}
      </div>
      <hr />
      {props.editable && !state.showForm &&
        <Button
          text="EDIT"
          styles="post-control"
          onClick={toggleForm}
        />
      }
      {props.editable &&
        <Button
          styles="post-control"
          onClick={deletePost}
          text="DELETE"
        />
      }
      {state.showForm && <PostForm onCancel={toggleForm} />}
      <CommentList
        comments={props.comments}
        onEditComment={props.onEditComment}
      />
    </div>
  );
};

export default Post;
