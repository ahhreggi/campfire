import { useState, useEffect } from "react";
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
import moment from "moment";

const Post = (props) => {

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
    onEditPost: PropTypes.func,
    onEditComment: PropTypes.func
  };

  const [state, setState] = useState({
    showForm: false,
    previewTitle: props.title,
    previewBody: props.body,
    previewAnonymous: props.anonymous
  });

  // Reset form state when switching posts
  useEffect(() => {
    setState({ ...state, showForm: false });
  }, [props.id]);

  // Reset preview states when toggling the post edit form
  useEffect(() => {
    setState({ ...state, previewTitle: props.body, previewBody: props.body, previewAnonymous: props.anonymous });
  }, [state.showForm]);

  // STATE-AFFECTING FUNCTIONS //////////////////////////////////////

  // Update the preview dynamically as the user types
  const updatePreview = (event, element) => {
    if (element === "title") {
      setState({ ...state, previewTitle: event.target.value });
    } else if (element === "body") {
      setState({ ...state, previewBody: event.target.value });
    } else if (element === "anonymous") {
      setState({ ...state, previewAnonymous: event.target.value });
    }
  };

  // Toggle and reset the post edit form
  const toggleForm = () => {
    setState({ ...state, showForm: !state.showForm });
  };

  // SERVER-REQUESTING FUNCTIONS ////////////////////////////////////

  // Save the post changes
  // TODO: Save only if it's different
  const savePost = () => {
    // TODO: May need to add more data to this (title, anonymous, lastModified?)
    // state.preview => { title, body, anonymous } ? things that can be edited via edit form
    const data = {
      body: state.previewBody
    };
    props.onEditPost(props.id, data);
    setState({ ...state, showForm: false, previewTitle: props.title, previewBody: props.body, previewAnonymous: props.anonymous });
  };

  // Delete the post
  const deletePost = () => {
    console.log("clicked DELETE post button");
  };

  // HELPER FUNCTIONS ///////////////////////////////////////////////

  // Return the author name to display
  // e.g. User is a student:     "First Last" or "Anonymous"
  //      User is an instructor: "First Last (Anonymous to students)"
  const getDisplayName = () => {
    // Set the displayed author name
    let displayName = props.anonymous ? "Anonymous" : props.author;
    if (props.anonymous && props.author) {
      displayName = props.author + " (Anonymous to students)";
    }
    return displayName;
  };

  // Return the total number of comments and child comments
  const getNumComments = (comments) => {
    return comments
      .map(comment => 1 + comment.replies.length)
      .reduce((a, b) => a + b, 0);
  };

  // Convert timestamp into a readable format
  const formatTimestamp = (timestamp) => {
    return moment(timestamp).format("dddd, MMMM Do, YYYY @ h:mm a");
  };

  // VARIABLES //////////////////////////////////////////////////////

  // Get the author name to display
  const authorName = getDisplayName();

  // Get the number of comments for the post
  const numComments = getNumComments(props.comments);

  // Determine if the post was ever modified (title or body only)
  const isModified = props.createdAt !== props.lastModified;

  // Create the tag button components
  const tags = props.tags.map(tag => {
    return (
      <Button
        key={tag.id}
        text={tag.name}
        styles="tag"
      />
    );
  });

  ///////////////////////////////////////////////////////////////////

  return (
    <div className="Post">

      <header className="status">

        {/* Resolution Status */}
        <div className={`resolution ${props.bestAnswer ? "resolved" : "unresolved"}`}>
          {props.bestAnswer ? "RESOLVED" : "UNRESOLVED" }
        </div>

        {/* View & Comment Counters */}
        <div className="counters">
          <span className="views icon-med">
            <img src={eye} alt="views" />
            {props.views}
          </span>
          <span className="comments icon-med">
            <img src={comment} alt="comments" />
            {numComments}
          </span>
        </div>

      </header>

      {/* Bookmark Toggler & Title */}
      <div className="header">
        <span className="bookmark">
          <Bookmark bookmarked={props.bookmarked} styles="icon-small" />
        </span>
        <div>
          {props.title}
        </div>
      </div>

      {/* Author & Timestamps */}
      <div className="subheader">
        <div>
          Submitted by <span className="author">{authorName}</span> on {formatTimestamp(props.createdAt)}
        </div>
        {isModified && <div className="modified">Last modified: {formatTimestamp(props.lastModified)}</div>}
      </div>

      {/* Tag Buttons */}
      <div className="tags">
        {tags}
      </div>

      <hr />

      {/* Post Body */}
      <div className="body">
        {props.body}
      </div>

      {/* Edit Preview */}
      {state.showForm &&
        <div className="body">
          <hr />
          <div className="label">Preview</div>
          {state.previewBody}
        </div>
      }

      {/* Post Form */}
      {state.showForm &&
        <PostForm
          text={state.previewBody}
          onChange={updatePreview}
        />
      }

      {/* Edit & Delete Buttons */}
      {props.editable &&
        <div className="controls icon-large">
          {!state.showForm &&
            <>
              <img
                className={state.showForm ? "active" : ""}
                src={edit}
                alt="edit"
                onClick={toggleForm}
              />
              <img
                src={trash}
                alt="delete"
                onClick={deletePost}
              />
            </>
          }
          {state.showForm &&
            <>
              <Button
                text="Save"
                styles="form green"
                onClick={savePost}
              />
              <Button
                text="Cancel"
                styles="form red"
                onClick={toggleForm}
              />
            </>
          }
        </div>
      }

      <hr />

      {/* Discussion */}
      <div className="comments">
        <div className="label">Discussion</div>
        <CommentList
          comments={props.comments}
          onEditComment={props.onEditComment}
        />
      </div>

    </div>
  );
};

export default Post;
