import { useState, useEffect } from "react";
import "./Post.scss";
import Button from "./Button";
import PostForm from "./PostForm";
import CommentList from "./CommentList";
import TagList from "./TagList";
import edit from "../images/icons/edit.png";
import trash from "../images/icons/trash.png";
import pin from "../images/icons/pin.png";
import star from "../images/icons/star.png";
import eye from "../images/icons/eye.png";
import comment from "../images/icons/comment.png";
import PropTypes from "prop-types";
import moment from "moment";

import EditForm from "./EditForm";
import Confirmation from "./Confirmation";

const Post = (props) => {

  Post.propTypes = {
    id: PropTypes.number,
    courseTags: PropTypes.array,
    anonymous: PropTypes.bool,
    author: PropTypes.string,
    bestAnswer: PropTypes.number,
    body: PropTypes.string,
    pinned: PropTypes.bool,
    bookmarked: PropTypes.bool,
    comments: PropTypes.array,
    createdAt: PropTypes.string,
    lastModified: PropTypes.string,
    pinnable: PropTypes.bool,
    editable: PropTypes.bool,
    tags: PropTypes.array,
    title: PropTypes.string,
    userID: PropTypes.number,
    views: PropTypes.number,
    onPinPost: PropTypes.func,
    onBookmarkPost: PropTypes.func,
    onEditPost: PropTypes.func,
    onDeletePost: PropTypes.func,
    onLikeComment: PropTypes.func,
    onEndorseComment: PropTypes.func,
    onEditComment: PropTypes.func,
    onTagToggle: PropTypes.func
  };

  const [state, setState] = useState({
    showForm: false,
    showConfirmation: false
  });

  // Reset form and confirmation states when switching posts
  useEffect(() => {
    setState({
      ...state,
      showForm: false,
      showConfirmation: false
    });
  }, [props.id]);

  // // Update breakBody when updating previewTitle and previewBody
  // useEffect(() => {
  //   const checkTitle = getLongestWordLength(state.previewTitle) > 34;
  //   const checkBody = getLongestWordLength(state.previewBody) > 34;
  //   setState({ ...state, breakBody: checkTitle || checkBody });
  // }, [state.previewTitle, state.previewBody]);

  // STATE-AFFECTING FUNCTIONS //////////////////////////////////////

  // Toggle and reset the post edit form
  const toggleForm = () => {
    if (!state.showForm && state.showConfirmation) {
      setState({ ...state, showForm: !state.showForm, showConfirmation: !state.showConfirmation});
    } else {
      setState({ ...state, showForm: !state.showForm });
    }
  };

  // Toggle delete confirmation form
  const toggleConfirmation = () => {
    if (!state.showConfirmation && state.showForm) {
      setState({ ...state, showForm: !state.showForm, showConfirmation: !state.showConfirmation });
    } else {
      setState({ ...state, showConfirmation: !state.showConfirmation });
    }
  };

  const handleClick = (tag) => {
    props.onTagToggle(tag, true);
  };

  // SERVER-REQUESTING FUNCTIONS ////////////////////////////////////

  // Pin/unpin the post
  const togglePin = () => {
    props.onPinPost(props.id);
  };

  // Bookmark/unbookmark the post
  const toggleBookmark = () => {
    props.onBookmarkPost(props.id);
  };

  // Save the post changes
  const savePost = (data) => {
    props.onEditPost(props.id, data);
    // Hide edit form
    toggleForm();
  };

  // Delete the post
  const deletePost = () => {
    props.onDeletePost(props.id);
    // Hide confirmation form
    toggleConfirmation();
  };

  // HELPER FUNCTIONS ///////////////////////////////////////////////

  // Return the author name based on the given anonymous value (bool)
  // e.g. User is a student: "First Last" or "Anonymous"
  //      User is the author or an instructor: "First Last (Anonymous to students)"
  // TODO: Move to helper file (also in CommentListItem)
  const getAuthorName = (author, anonymous) => {
    // Set the displayed author name
    let name = anonymous ? "Anonymous" : author;
    if (anonymous && author) {
      name = author + " (Anonymous to students)";
    }
    return name;
  };

  // Return the total number of comments and child comments
  const getNumComments = (comments) => {
    return comments
      .map(comment => 1 + comment.replies.length)
      .reduce((a, b) => a + b, 0);
  };

  // Convert timestamp into a readable format
  // TODO: Move to helper file
  const formatTimestamp = (timestamp, relative) => {
    if (relative) {
      return moment(timestamp).fromNow();
    } else {
      return moment(timestamp).format("dddd, MMMM Do, YYYY @ h:mm a");
    }
  };

  // Return true if tags contains the given tag ID
  // TODO: Move to helper file (also in TagList)
  const hasTag = (tags, tagID) => {
    return tags.filter(tag => tag.id === tagID).length;
  };

  // Return the length of the longest word in the given string
  const getLongestWordLength = (text) => {
    return Math.max(...text.split(" ").map(word => word.length));
  };

  // VARIABLES //////////////////////////////////////////////////////

  // Get the author name to display
  const authorName = getAuthorName(props.author, props.anonymous);

  // Get the number of comments for the post
  const numComments = getNumComments(props.comments);

  // Determine if the post was ever modified (title or body only)
  const isModified = props.createdAt !== props.lastModified;

  // Check if limit is reached
  // TODO: Store tagList in an .env along with other global app variables
  // const tagLimit = 5;
  // const limitReached = state.previewTags.length === tagLimit;

  ///////////////////////////////////////////////////////////////////

  return (
    <div className="Post">

      <div className={`display ${state.showForm || state.showConfirmation ? "preview-mode" : ""}`}>

        <header className="status">

          {/* Resolution Status */}
          <div className={`resolution ${props.bestAnswer ? "resolved" : "unresolved"}`}>
            {props.bestAnswer ? "RESOLVED" : "UNRESOLVED" }
          </div>

          {/* Views */}
          <div className="views icon-med">
            <img src={eye} alt="views" />
            {props.views}
          </div>

        </header>

        {/* Title */}
        <div className="post-header">
          <div>
            {props.title}
          </div>
        </div>

        {/* Author & Timestamps */}
        <div className="post-subheader">
          <div>
            Submitted by <span className="author">{authorName}</span> on {formatTimestamp(props.createdAt)}
          </div>
          {!isModified &&
            <div className="modified">
              Last modified: {formatTimestamp(props.lastModified)} ({formatTimestamp(props.lastModified, true)})
            </div>
          }
        </div>

        <footer className="post-icons">

          {/* Tag Buttons */}
          <div className="tags">
            <TagList
              tags={props.tags}
              selectedTags={props.tags}
              onClick={handleClick}
            />
          </div>

          {/* Pin & Bookmark Togglers */}
          <div className="list-controls">
            {props.pinnable &&
              <span className={`pin icon-med ${!props.pinned && "disabled"}`}>
                <img src={pin} alt="pin" onClick={togglePin} />
              </span>
            }
            <span className={`bookmark icon-med ${!props.bookmarked && "disabled"}`}>
              <img src={star} alt="bookmark" onClick={toggleBookmark} />
            </span>
          </div>

        </footer>

        <hr />

        {/* Post Body */}
        <div className={`post-body ${state.breakBody && "break"}`}>
          {props.body}
        </div>

      </div>

      {/* Edit Control Buttons */}
      {props.editable &&
        <div className="controls icon-large">
          <>
            <img
              className={state.showForm ? "active" : ""}
              src={edit}
              alt="edit"
              onClick={toggleForm}
            />
            <img
              className={state.showConfirmation ? "active" : ""}
              src={trash}
              alt="delete"
              onClick={toggleConfirmation}
            />
          </>
        </div>
      }

      {/* Edit Form */}
      {state.showForm &&
        <>
          <hr />
          <EditForm
            id={props.id}
            title={props.title}
            author={props.author}
            body={props.body}
            anonymous={props.anonymous}
            tags={props.tags}
            courseTags={props.courseTags}
            mode={"POST"}
            onSave={savePost}
            onCancel={toggleForm}
          />
        </>
      }

      {/* Delete Confirmation */}
      {state.showConfirmation &&
        <>
          <hr />
          <Confirmation
            message={"Are you sure you would like to delete this post?"}
            onConfirm={deletePost}
            onCancel={toggleConfirmation}
          />
        </>
      }

      <hr />

      {/* Discussion */}
      <div className="discussion">
        <div className="label">
          <span className="comments icon-med">
            <img src={comment} alt="comments" />
          </span>
          Discussion {numComments > 0 && `(${numComments})`}
        </div>
        <CommentList
          comments={props.comments}
          onLikeComment={props.onLikeComment}
          onEndorseComment={props.onEndorseComment}
          onEditComment={props.onEditComment}
          bestAnswer={props.bestAnswer}
        />
      </div>

    </div>
  );
};

export default Post;
