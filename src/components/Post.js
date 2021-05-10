import { useState, useEffect } from "react";
import "./Post.scss";
import Bookmark from "./Bookmark";
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

const Post = (props) => {

  Post.propTypes = {
    id: PropTypes.number,
    courseTags: PropTypes.array,
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
    onDeletePost: PropTypes.func,
    onEditComment: PropTypes.func,
    onTagToggle: PropTypes.func
  };

  const [state, setState] = useState({
    showForm: false,
    showConfirmation: false,
    previewTitle: props.title,
    previewBody: props.body,
    previewAnonymous: props.anonymous,
    previewAuthor: props.author,
    previewTags: props.tags
  });

  // Reset form and confirmation states when switching posts
  useEffect(() => {
    setState({
      ...state,
      showForm: false,
      showConfirmation: false
    });
  }, [props.id]);

  // Reset preview states when toggling the post edit form
  useEffect(() => {
    setState({
      ...state,
      previewTitle: props.title,
      previewBody: props.body,
      previewAnonymous: props.anonymous,
      previewAuthor: getAuthorName(props.anonymous),
      previewTags: props.tags
    });
  }, [state.showForm]);

  // Update previewAuthor when toggling previewAnonymous
  useEffect(() => {
    setState({
      ...state,
      previewAuthor: getAuthorName(state.previewAnonymous)
    });
  }, [state.previewAnonymous]);

  // STATE-AFFECTING FUNCTIONS //////////////////////////////////////

  // Update the preview title dynamically as the user types
  const updatePreviewTitle = (event) => {
    setState({ ...state, previewTitle: event.target.value });
  };

  // Update the preview body dynamically as the user types
  const updatePreviewBody = (event) => {
    setState({ ...state, previewBody: event.target.value });
  };

  // Update the preview author dynamically as the user toggles its anonymity
  const updatePreviewAnonymous = (event) => {
    setState({ ...state, previewAnonymous: event.target.checked });
  };

  // Update the preview tags dynamically as the user toggles them
  const updatePreviewTags = (tag) => {
    const selected = hasTag(state.previewTags, tag.id);
    // If the tag is already selected, unselect it
    if (selected) {
      const updatedTags = state.previewTags.filter(pTag => pTag.id !== tag.id);
      setState({ ...state, previewTags: updatedTags });
      // Otherwise, select it
    } else {
      setState({ ...state, previewTags: [ ...state.previewTags, tag ] });
    }
  };

  // Toggle and reset the post edit form
  const toggleForm = () => {
    setState({ ...state, showForm: !state.showForm });
  };

  // Toggle delete confirmation form
  const toggleConfirmation = () => {
    setState({ ...state, showConfirmation: !state.showConfirmation });
  };

  const handleClick = (tag) => {
    props.onTagToggle(tag, true);
  };

  // SERVER-REQUESTING FUNCTIONS ////////////////////////////////////

  // Save the post changes
  const savePost = () => {
    const data = {
      title: state.previewTitle,
      body: state.previewBody,
      anonymous: state.previewAnonymous,
      tags: state.previewTags
    };
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
  const getAuthorName = (anonymous) => {
    // Set the displayed author name
    let name = anonymous ? "Anonymous" : props.author;
    if (anonymous && props.author) {
      name = props.author + " (Anonymous to students)";
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
  const formatTimestamp = (timestamp) => {
    return moment(timestamp).format("dddd, MMMM Do, YYYY @ h:mm a");
  };

  // Return true if tags contains the given tag ID
  // TODO: Move to helper file (also in TagList)
  const hasTag = (tags, tagID) => {
    return tags.filter(tag => tag.id === tagID).length;
  };

  // VARIABLES //////////////////////////////////////////////////////

  // Get the author name to display
  const authorName = getAuthorName(props.anonymous);

  // Get the number of comments for the post
  const numComments = getNumComments(props.comments);

  // Determine if the post was ever modified (title or body only)
  const isModified = props.createdAt !== props.lastModified;

  // Check if limit is reached
  // TODO: Store tagList in an .env along with other global app variables
  const tagLimit = 5;
  const limitReached = state.previewTags.length === tagLimit;

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
          {isModified && <div className="modified">Last modified: {formatTimestamp(props.lastModified)}</div>}
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
            <span className="pin icon-med">
              <img src={pin} alt="pin" />
            </span>
            <span className="bookmark icon-med">
              <img src={star} alt="bookmark" />
            </span>
          </div>

        </footer>

        <hr />

        {/* Post Body */}
        <div className="post-body">
          {props.body}
        </div>

      </div>

      {/* Edit Preview */}
      {state.showForm &&
        <div className="preview">

          <hr />
          <div className="label">Preview</div>

          {/* PREVIEW: Post Title */}
          <div className="post-header">
            <div>
              {state.previewTitle}
            </div>
          </div>

          {/* PREVIEW: Author */}
          <div className="post-subheader">
            <div>
              Posting as <span className="author">{state.previewAuthor}</span>
            </div>
          </div>

          {/* PREVIEW: Post Body */}
          <div className="post-body">
            {state.previewBody}
          </div>

        </div>
      }

      {/* Post Form */}
      {state.showForm &&
        <div className="post-form">

          <hr />

          {/* Post Title Textarea */}
          <PostForm
            label="Post Title"
            text={state.previewTitle}
            onChange={updatePreviewTitle}
            styles="form-title"
          />

          {/* Post Body Textarea */}
          <PostForm
            label="Post Body"
            text={state.previewBody}
            onChange={updatePreviewBody}
            styles="form-body"
          />

          {/* Anonymous Checkbox */}
          <div className="anon-form">
            Post as anonymous?
            <input
              className="form-check-input"
              type="checkbox"
              checked={state.previewAnonymous}
              onChange={updatePreviewAnonymous}
            />
            <span className="note">{state.previewAnonymous && " you will still be visible to instructors"}</span>
          </div>

          {/* Course Tag Form */}
          <div className="post-form-tags">
            <div className="label">
              Select up to <span className={`tag-counter ${limitReached && "limit"}`}> {tagLimit - state.previewTags.length}</span> tag(s):
            </div>
            <TagList
              tags={props.courseTags}
              selectedTags={state.previewTags}
              selectLimit={tagLimit}
              onClick={updatePreviewTags}
            />
          </div>

        </div>
      }

      {/* Delete Confirmation */}
      {state.showConfirmation &&
        <>
          <hr />
          <div className="confirmation">
            <span>
              Are you sure you would like to delete this post?
            </span>
          </div>
        </>
      }

      {/* Edit Control Buttons */}
      {props.editable &&
        <div className="controls icon-large">
          {!state.showForm && !state.showConfirmation &&
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
                onClick={toggleConfirmation}
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
          {state.showConfirmation &&
            <div className="confirmation">
              <>
                <Button
                  text="Confirm"
                  styles="form green"
                  onClick={deletePost}
                />
                <Button
                  text="Cancel"
                  styles="form red"
                  onClick={toggleConfirmation}
                />
              </>
            </div>
          }
        </div>
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
          onEditComment={props.onEditComment}
        />
      </div>

    </div>
  );
};

export default Post;
