import { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import classNames from "classnames";
import EditForm from "./EditForm";
import Confirmation from "./Confirmation";
import CommentList from "./CommentList";
import like from "../images/icons/heart.png";
import endorse from "../images/icons/endorse.png";
import plus from "../images/icons/plus.png";
import minus from "../images/icons/minus.png";
import edit from "../images/icons/edit.png";
import trash from "../images/icons/trash.png";
import checkmark from "../images/icons/checkmark.png";
import "./CommentListItem.scss";

const CommentListItem = (props) => {

  CommentListItem.propTypes = {
    id: PropTypes.number,
    parentID: PropTypes.number,
    anonymous: PropTypes.bool,
    authorFirstName: PropTypes.string,
    authorLastName: PropTypes.string,
    authorRole: PropTypes.string,
    avatarID: PropTypes.number,
    body: PropTypes.string,
    score: PropTypes.number,

    createdAt: PropTypes.string,
    lastModified: PropTypes.string,

    liked: PropTypes.bool,
    endorsed: PropTypes.bool,

    editable: PropTypes.bool,
    endorsable: PropTypes.bool,

    endorsements: PropTypes.array,
    replies: PropTypes.array,

    onLikeComment: PropTypes.func,

    onEditComment: PropTypes.func,
    onDeleteComment: PropTypes.func,

    bestAnswer: PropTypes.number,

    postAuthorID: PropTypes.number,
    commentAuthorID: PropTypes.number
  };

  const [state, setState] = useState({
    showForm: false,
    showConfirmation: false,
    showReplies: false,
    endorsed: props.endorsed
  });

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

  // SERVER-REQUESTING FUNCTIONS ////////////////////////////////////

  // Like/unlike the comment
  const toggleLiked = () => {
    props.onLikeComment(props.id, props.liked);
  };


  const saveComment = (data) => {
    props.onEditComment(props.id, data);
    // Hide edit form
    toggleForm();
  };

  const deleteComment = () => {
    props.onDeleteComment(props.id);
    // Hide confirmation form
    toggleConfirmation();
  };

  // HELPER FUNCTIONS ///////////////////////////////////////////////

  // Return the author name based on the given anonymous value (bool)
  // e.g. User is a student: "First Last" or "Anonymous"
  //      User is the author or an instructor: "First Last (Anonymous to students)"
  // TODO: Move to helper file (also in Post)
  const getAuthorName = (authorFirstName, authorLastName, anonymous) => {

    const fullName = authorFirstName ? authorFirstName + " " + authorLastName : null;

    // Set the displayed author name
    let name = anonymous ? "Anonymous" : fullName;

    // BUT if the author is the owner (checked by anonymous = true and F/L !== null)
    if (anonymous && fullName) {
      name = fullName + " (Anonymous to students)";
    }
    return name;
  };

  // Return the author role to display
  const getAuthorRole = (authorRole, replaceOwner = false) => {
    if (replaceOwner && ["owner", "admin"].includes(authorRole)) {
      return "instructor";
    }
    return authorRole;
  };

  // Convert timestamp into a readable format
  // TODO: Move to helper file
  const formatTimestamp = (timestamp, relative) => {
    if (relative) {
      return moment(timestamp).subtract(3, "seconds").fromNow();
    } else {
      return moment(timestamp).subtract(3, "seconds").format("dddd, MMMM Do, YYYY @ h:mm a");
    }
  };

  // Return a formatted relative timestamp based on if it was modified
  const getTimestamp = (timestamp, isModified) => {
    const result = `${isModified ? "Last modified: " : ""} ${formatTimestamp(timestamp)}`;
    return `${result} (${formatTimestamp(timestamp, true)})`;
  };


  // VARIABLES //////////////////////////////////////////////////////

  // Check if the comment is a parent
  const isParent = !props.parentID;

  // Check if the comment is by an instructor
  const isInstructor = props.authorRole !== "student";

  // Check if the comment is the post author
  const isPostAuthor = props.postAuthorID === props.commentAuthorID;

  // Check if the comment is selected as the best answer
  const isBestAnswer = props.bestAnswer === props.id;

  // Check if the comment was ever modified
  const isModified = props.createdAt !== props.lastModified;

  // Get the author name to display
  const authorName = getAuthorName(props.authorFirstName, props.authorLastName, props.anonymous);

  // Get the author role to display
  const authorRole = getAuthorRole(props.authorRole, false);

  // Get the timestamp to display
  const timestamp = getTimestamp(props.lastModified, isModified);

  // Get a list of all endorsers
  const endorsers = props.endorsements.length ? props.endorsements.map(endorsement => endorsement.endorser_name) : null;

  // Get class names
  const classes = classNames({
    CommentListItem: true,
    "highlight-parent": isParent,
    "highlight-instructor": isInstructor,
    "highlight-author": isPostAuthor,
    "highlight-best": isBestAnswer,
    "highlight-delete": state.showConfirmation
  });

  ///////////////////////////////////////////////////////////////////

  return (
    <div className={classes}>

      {/* Top-level Comment */}
      <div className="top">
        <section className="left">

          {/* Avatar */}
          <div className="avatar">
            <img src={`./images/avatars/${props.avatarID}.png`} alt="avatar" />
          </div>

          {/* Role */}
          <div className={`role ${isInstructor && "instructor"}`}>
            {authorRole}
          </div>

          {/* Engagements */}
          <div className="engagements">

            {/* Likes */}
            <div className="likes">
              <span className="icon heart">
                <img src={like} alt="like" />
              </span>
              <span className={`counter ${props.liked && "active"}`}>
                {props.score}
              </span>
              <span className="toggle">
                <img
                  src={props.liked ? minus : plus}
                  alt="liked"
                  onClick={toggleLiked}
                />
              </span>
            </div>

          </div>

        </section>

        <section className="right">


          {/* Comment Header */}
          <div>
            <header>

              {/* Author */}
              <div className="author">
                {authorName}
              </div>

              {/* Best Answer Label */}
              {isBestAnswer &&
                <div className="label">
                  <img src={checkmark} alt="checkmark" />
                  <span>BEST ANSWER</span>
                </div>
              }

            </header>

            {/* Comment Body */}
            <div className="comment-body">

              {/* Comment Text */}
              <div className="text">
                {props.body}
              </div>

              {/* Comment Endorsers */}
              {endorsers &&
                <div className="endorsers">
                  <div className="icon medal">
                    <img src={endorse} alt="endorse" />
                  </div>
                  <div className="text">
                    Endorsed by <span className="names">{endorsers}</span>
                  </div>
                </div>
              }

            </div>
          </div>

          {/* Comment Footer */}
          <footer>

            {/* Timestamp */}
            <div className={`timestamp ${isModified && "modified"}`}>
              {timestamp}
            </div>

            {/* Comment Edit Controls */}
            {props.editable &&
              <div className="controls">

                <span className="edit">
                  <img
                    className={"icon-large" + (state.showForm ? "" : " disabled")}
                    src={edit}
                    alt="edit"
                    onClick={toggleForm}
                  />
                </span>
                <span className="delete">
                  <img
                    className={"icon-large" + (state.showConfirmation ? "" : " disabled")}
                    src={trash}
                    alt="delete"
                    onClick={toggleConfirmation}
                  />
                </span>

              </div>
            }

          </footer>

        </section>
      </div>

      {/* Edit Form & Confirmation */}
      {props.editable &&
        <div className="editable">

          {/* Edit Form */}
          {state.showForm &&
            <>
              <hr />
              <EditForm
                id={props.id}
                author={props.authorFirstName + " " + props.authorLastName}
                body={props.body}
                anonymous={props.anonymous}
                mode={"COMMENT"}
                onSave={saveComment}
                onCancel={toggleForm}
              />
            </>
          }

          {/* Delete Confirmation */}
          {state.showConfirmation &&
            <div className="confirmation-delete">
              <hr />
              <Confirmation
                message={`Are you sure you would like to delete this ${isParent ? "comment" : "reply"}?`}
                onConfirm={deleteComment}
                onCancel={toggleConfirmation}
              />
            </div>
          }

        </div>
      }

      {/* Replies */}
      {isParent && props.replies.length > 0 &&
        <section className="replies">
          <CommentList
            comments={props.replies}
            onLikeComment={props.onLikeComment}
            onEditComment={props.onEditComment}
            onDeleteComment={props.onDeleteComment}
            bestAnswer={props.bestAnswer}
            postAuthorID={props.postAuthorID}
          />
        </section>
      }

    </div>
  );
};

export default CommentListItem;
