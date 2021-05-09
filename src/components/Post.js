import { useState } from "react";
import "./Post.scss";
import Button from "./Button";
import PostForm from "./PostForm";
import CommentList from "./CommentList";
import PropTypes from "prop-types";

// Receiving: props.post => contains all data for a specific post

const Post = (props) => {

  const [state, setState] = useState({
    showForm: true,
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

  return (
    <div className="Post">
      <div className={`status ${props.bestAnswer ? "resolved" : "unresolved"}`}>
        {props.bestAnswer && "RESOLVED"}
        {!props.bestAnswer && "UNRESOLVED"}
      </div>
      <div className="title">
        {props.title}
      </div>
      <div className="subtitle">
        Submitted by <span className="author">{props.author}</span> on {props.createdAt} {modifiedMsg}
      </div>
      <div className="body">
        {props.body}
      </div>
      {props.bestAnswer && <div>this question is RESOLVED</div>}
      {!props.bestAnswer && <div>this question is UNRESOLVED</div>}
      <div>
        id: {props.id}
      </div>
      <div>
        anonymous: {props.anonymous ? "true" : "false"}
      </div>
      <div>
        resolved? (best answer): {props.bestAnswer ? "id: " + props.bestAnswer : "none selected"}
      </div>
      <div>
        bookmarked: {props.bookmarked ? "true" : "false"}
      </div>
      <div>
        created at: {props.createdAt}
      </div>
      <div>
        last modified: {props.lastModified}
      </div>
      <div>
        editable: {props.editable ? "true" : "false"}
      </div>
      <div>
        tags:
        {tags}
      </div>
      <div>
        views: {props.views}
      </div>
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
