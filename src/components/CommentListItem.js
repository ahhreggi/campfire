import { useState } from "react";
import "./CommentListItem.scss";
import EditForm from "./EditForm";
import Confirmation from "./Confirmation";
import like from "../images/icons/heart.png";
import endorse from "../images/icons/endorse.png";
import plus from "../images/icons/plus.png";
import minus from "../images/icons/minus.png";
import edit from "../images/icons/edit.png";
import trash from "../images/icons/trash.png";
import checkmark from "../images/icons/checkmark.png";
import PropTypes from "prop-types";
import moment from "moment";
import classNames from "classnames";

const CommentListItem = (props) => {

  CommentListItem.propTypes = {
    id: PropTypes.number,
    parentID: PropTypes.number,
    anonymous: PropTypes.bool,
    author: PropTypes.string,
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
    onEndorseComment: PropTypes.func,

    onEditComment: PropTypes.func,
    onDeleteComment: PropTypes.func,

    bestAnswer: PropTypes.number
  };

  const [state, setState] = useState({
    showForm: false,
    showConfirmation: false,
    showReplies: false,
    endorsed: props.endorsed
  });

  // // Update breakBody when updating previewBody
  // useEffect(() => {
  //   const checkBody = getLongestWordLength(state.previewBody) > 34;
  //   setState({ ...state, breakBody: checkBody });
  // }, [state.previewBody]);

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

  const editComment = () => {
    console.log("clicked EDIT comment button");
  };
  // Like/unlike the comment
  const toggleLiked = () => {
    props.onLikeComment(props.id);
  };

  // Endorse/unendorse the comment
  const toggleEndorsed = () => {
    props.onEndorseComment(props.id);
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
  const getAuthorName = (author, anonymous) => {
    // Set the displayed author name
    let name = anonymous ? "Anonymous" : author;
    if (anonymous && author) {
      name = author + " (Anonymous to students)";
    }
    return name;
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

  // Return a formatted relative timestamp based on if it was modified
  const getTimestamp = (timestamp, isModified) => {
    const result = `${isModified ? "Last modified: " : ""} ${formatTimestamp(timestamp)}`;
    return `${result} (${formatTimestamp(timestamp, true)})`;
  };

  // Return the length of the longest word in the given string
  const getLongestWordLength = (text) => {
    return Math.max(...text.split(" ").map(word => word.length));
  };


  // VARIABLES //////////////////////////////////////////////////////

  // Check if the comment is a parent
  const isParent = !props.parentID;

  // Check if the comment is by an instructor
  const isInstructor = props.authorRole !== "student";

  // Check if the comment is selected as the best answer
  const isBestAnswer = props.bestAnswer === props.id;

  // Check if the comment was ever modified
  const isModified = props.createdAt !== props.lastModified;

  // Get the author name to display
  const authorName = getAuthorName(props.author, props.anonymous);

  // Get the timestamp to display
  const timestamp = getTimestamp(props.lastModified, isModified);

  // Get class names
  const classes = classNames({
    CommentListItem: true,
    isParent,
    isInstructor,
    isBestAnswer
  });

  // Create the reply list components if the comment is top-level (parentID is null)
  const replies = isParent && props.replies.map(comment => {
    return (
      <CommentListItem
        key={comment.id}
        id={comment.id}
        parentID={comment.parent_id}
        anonymous={comment.anonymous}
        author={`${comment.author_first_name} ${comment.author_last_name}`}
        authorRole={comment.role}
        avatarID={comment.author_avatar_id}
        body={comment.body}
        score={comment.score}
        createdAt={comment.created_at}
        lastModified={comment.last_modified}
        liked={comment.liked}
        endorsed={comment.endorsed}
        editable={comment.editable}
        endorsable={comment.endorsable}
        endorsements={comment.endorsements}
        onEditComment={props.onEditComment}
        onDeleteComment={props.onDeleteComment}
        bestAnswer={props.bestAnswer}
      />
    );
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

            {/* Endorsements */}
            <div className="endorsements">
              <span className="icon medal">
                <img src={endorse} alt="endorse" />
              </span>
              <span className={`counter ${props.endorsed && "active"}`}>
                {props.endorsements.length}
              </span>
              <span className="toggle">
                <img
                  src={props.endorsed ? minus : plus}
                  alt="endorsed"
                  onClick={toggleEndorsed}
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
            <div className="body">
              {props.body}
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
              <div className="controls icon-large?">

                <span className="edit">
                  <img
                    className={state.showForm ? "active" : ""}
                    src={edit}
                    alt="edit"
                    onClick={toggleForm}
                  />
                </span>
                <span className="delete">
                  <img
                    className={state.showConfirmation ? "active" : ""}
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
                author={props.author}
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
            <>
              <hr />
              <Confirmation
                message={"Are you sure you would like to delete this comment?"}
                onConfirm={deleteComment}
                onCancel={toggleConfirmation}
              />
            </>
          }

        </div>
      }

      {/* Replies */}
      {isParent &&
        <section className="replies">
          {replies}
        </section>
      }

    </div>
  );
};

export default CommentListItem;
