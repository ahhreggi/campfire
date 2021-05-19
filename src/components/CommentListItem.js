import ReactMarkdown from "react-markdown";
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import classNames from "classnames";
import EditForm from "./EditForm";
import CommentForm from "./CommentForm";
import Confirmation from "./Confirmation";
import CommentList from "./CommentList";
import like from "../images/icons/heart.png";
import endorse from "../images/icons/endorse.png";
import plus from "../images/icons/plus.png";
import minus from "../images/icons/minus.png";
import reply from "../images/icons/reply.png";
import edit from "../images/icons/edit.png";
import trash from "../images/icons/trash.png";
import checkmark from "../images/icons/checkmark.png";
import comment from "../images/icons/comment.png";
import "./CommentListItem.scss";
import CodeSyntax from "./CodeSyntax";

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
    edits: PropTypes.array,
    replies: PropTypes.array,

    onLikeComment: PropTypes.func,

    onAddComment: PropTypes.func,
    onEditComment: PropTypes.func,
    onDeleteComment: PropTypes.func,

    bestAnswer: PropTypes.number,
    onEditBestAnswer: PropTypes.func,

    postAuthorID: PropTypes.number,
    commentAuthorID: PropTypes.number,

    userName: PropTypes.string,
    userID: PropTypes.number,
    userRole: PropTypes.string,

    refBestAnswer: PropTypes.object,

    uncollapsed: PropTypes.array,

    showReplyList: PropTypes.bool
  };

  const [state, setState] = useState({
    showForm: false,
    showConfirmation: false,
    showReplyForm: false,
    showReplyList: props.showReplyList, // props.uncollapsed.includes(props.id),
    endorsed: props.endorsed,
    commentID: props.id
  });

  // When uncollapsed changes, update showReplyList in state
  useEffect(() => {
    if (!state.showReplyList && props.uncollapsed.includes(props.id)) {
      setState({ showReplyList: true });
    }
  }, [props.uncollapsed]);

  // STATE-AFFECTING FUNCTIONS //////////////////////////////////////

  // Toggle and reset the comment edit form
  const toggleForm = () => {
    if (!state.showForm) {
      setState({ ...state, showForm: true, showConfirmation: false, showReplyForm: false });
    } else {
      setState({ ...state, showForm: false });
    }
  };

  // Toggle and reset the new reply form
  const toggleReplyForm = () => {
    if (!state.showReplyForm) {
      scrollToReplyForm();
      setState({ ...state, showReplyForm: true, showConfirmation: false, showForm: false });
    } else {
      setState({ ...state, showReplyForm: false });
    }
  };

  // Toggle delete confirmation form
  const toggleConfirmation = () => {
    if (!state.showConfirmation) {
      setState({ ...state, showConfirmation: true, showForm: false, showReplyForm: false });
    } else {
      setState({ ...state, showConfirmation: false });
    }
  };

  // Toggle reply list
  const toggleReplyList = () => {
    setState({ ...state, showReplyList: !state.showReplyList });
  };

  // SERVER-REQUESTING FUNCTIONS ////////////////////////////////////

  // Like/unlike the comment
  const toggleLiked = () => {
    props.onLikeComment(props.id, props.liked);
  };

  // Save the comment changes
  const saveComment = (data) => {
    // Check that changes were actually made
    if (props.body !== data.body) {
      props.onEditComment(props.id, data);
    }
    // Hide edit form
    toggleForm();
  };

  // Delete the comment
  const deleteComment = () => {
    props.onDeleteComment(props.id);
    // Hide confirmation form
    toggleConfirmation();
  };

  // Set the comment as the post's best answer
  const setBestAnswer = () => {
    props.onEditBestAnswer(props.id);
  };

  // Add a reply
  const addReply = (data) => {
    const newReplyData = {
      body: data.body,
      parentID: props.id,
      anonymous: data.anonymous
    };
    props.onAddComment(newReplyData);
    // Hide reply form
    setState({ ...state, showReplyForm: false, showReplyList: true });
    scrollToReplyForm();
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

  // VARIABLES //////////////////////////////////////////////////////

  // Check if the comment is a parent
  const isParent = !props.parentID;

  // Check if the comment is by an instructor
  const isInstructor = props.authorRole !== "student";

  // Check if the comment is by a student
  const isStudent = props.authorRole === "student";

  // Check if the comment is by the post author
  const isPostAuthor = props.commentAuthorID === props.postAuthorID;

  // Check if the comment is selected as the best answer
  const isBestAnswer = props.bestAnswer === props.id;

  // Check if the comment was ever modified
  const isModified = props.createdAt !== props.lastModified;

  // Get the author name to display
  const authorName = getAuthorName(props.authorFirstName, props.authorLastName, props.anonymous);

  // Get the author role to display
  const authorRole = getAuthorRole(props.authorRole, false);

  // Get the name of the last editor
  const editor = props.edits && props.edits.length > 0 ? props.edits[props.edits.length - 1] : null;
  const editorName = editor ? editor.first_name + " " + editor.last_name : null;
  const editorRole = editor ? editor.role : null;

  // Get the timestamp to display
  const timestamp = formatTimestamp(props.lastModified);
  const relativeTimestamp = formatTimestamp(props.lastModified, true);
  let timestampElement;
  if (isModified) {
    timestampElement = (<span className="modified">{timestamp} (edited {relativeTimestamp}{props.commentAuthorID !== editor.user_id && <> by <span className={editorRole !== "student" ? "instructor" : "student"}>{editorName}</span></>})</span>);
  } else {
    timestampElement = (<>{timestamp} ({relativeTimestamp})</>);
  }

  // Get a list of all endorsers
  const endorsers = props.endorsements.length ? props.endorsements.map((endorsement, index) => {
    return (<span key={endorsement.id}><span className="endorser-name">{endorsement.endorser_name}</span>{index !== props.endorsements.length - 1 ? "," : ""} </span>);
  }) : "";

  // Check if the comment is by the current user
  const userIsCommentAuthor = props.userID === props.commentAuthorID;

  // Check if the post is by the current user
  const userIsPostAuthor = props.userID === props.postAuthorID;

  // const userIsInstructor = props.userRole !== "student";

  // Get class names
  const classes = classNames({
    CommentListItem: true,
    "highlight-parent": isParent,
    "highlight-instructor": isInstructor,
    "highlight-student": isStudent,
    "highlight-author": isPostAuthor,
    "highlight-best": isBestAnswer,
    "highlight-delete": state.showConfirmation,
    "highlight-user": userIsCommentAuthor,
    "break-body": Math.max(...props.body.split(" ").map(word => word.length)) > 100
  });

  // Scroll to reply form
  const refReplyForm = useRef();
  const scrollToReplyForm = () => {
    setTimeout(() => {
      refReplyForm.current.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  ///////////////////////////////////////////////////////////////////

  return (
    <div className={classes}>

      <div className="best-ref" ref={isBestAnswer ? props.refBestAnswer : null}></div>

      {/* Top-level Comment */}
      <div className="top">
        <section className="left">

          {/* Avatar */}
          <div className="avatar">
            <img src={`./images/avatars/${props.avatarID}.png`} alt="avatar" />
          </div>

          {/* Role */}
          <div className={`role ${isInstructor && "instructor"}`}>
            {props.anonymous && (props.authorRole === "owner") ? "instructor" : authorRole}
          </div>

          {/* Engagements */}
          <div className="engagements">

            {/* Likes */}
            <div className="likes">
              <span className="icon heart">
                <img
                  className={!props.liked ? "not-liked" : ""}
                  src={like}
                  alt="like"
                />
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

          {!state.showForm &&
            <div>

              {/* Comment Header */}
              <header>

                {/* Author */}
                <div className="comment-author text-truncate">
                  {authorName}
                  {isPostAuthor &&
                    <>
                      <img className="author-badge" src={edit} alt="author" />
                    </>
                  }
                </div>

                {/* Best Answer Label */}
                {isBestAnswer &&
                  <div className={`label selected ${userIsPostAuthor ? "active" : ""}`} onClick={userIsPostAuthor && !props.bestAnswer ? setBestAnswer : null}>
                    <div>
                      <img src={checkmark} alt="checkmark" />
                      <span>BEST ANSWER</span>
                    </div>
                  </div>
                }

                {/* Select Best Answer Label */}
                {!props.bestAnswer && props.bestAnswer !== props.id && userIsPostAuthor &&
                  <div className="label unselected" onClick={!props.bestAnswer ? setBestAnswer : null}>
                    <span>SELECT AS BEST ANSWER</span>
                  </div>
                }

              </header>

              {/* Comment Body */}
              <div className="comment-body">

                {/* Comment Text */}
                <div className="text">
                  <ReactMarkdown components={CodeSyntax}>
                    {props.body}
                  </ReactMarkdown>
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
          }

          {/* Edit Form */}
          {state.showForm &&
            <>
              <EditForm
                label={isParent ? "EDIT COMMENT" : "EDIT REPLY"}
                id={props.id}
                author={props.authorFirstName + " " + props.authorLastName}
                role={props.authorRole}
                isInstructor={props.authorRole !== "student"}
                body={props.body}
                anonymous={props.anonymous}
                mode={"COMMENT"}
                onSave={saveComment}
                onCancel={toggleForm}
                minHeight={"5rem"}
              />
            </>
          }

          {/* Comment Footer */}
          <footer>


            {/* Timestamp */}
            <div className="timestamp text-truncate">
              {timestampElement}
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
          {false && state.showForm &&
            <div className="comment-edit-form">
              <hr />
              <EditForm
                label={"EDIT PREVIEW"}
                id={props.id}
                author={props.authorFirstName + " " + props.authorLastName}
                body={props.body}
                anonymous={props.anonymous}
                mode={"COMMENT"}
                onSave={saveComment}
                onCancel={toggleForm}
                minHeight={"5rem"}
              />
            </div>
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

      {/* First Reply Toggler */}
      {isParent && !state.showConfirmation &&
        <>
          <div className="discussion-label replies-label">
            <span className="reply-controls first">

              {/* Add Reply Button */}
              {true &&
                <span
                  className={`reply ${state.showReplyForm ? "reply-active" : ""}`}
                  onClick={state.showReplyList && state.showReplyForm ? () => scrollToReplyForm() : toggleReplyForm}
                >
                  <img
                    src={reply}
                    alt="reply"
                  />
                  <span>REPLY</span>
                </span>
              }

              {/* Show/Hide Replies */}
              {props.replies.length > 0 &&
                <div className={`replies-present ${state.showReplyList ? "replies-active" : ""}`} onClick={toggleReplyList}>
                  <span className="toggle-item comments">
                    <img src={comment} alt="comments" />
                  </span>

                  <span className="toggle-item">
                    {state.showReplyList ? "Hide" : "Show" } Replies {props.replies.length > 0 && `(${props.replies.length})`}
                  </span>
                </div>
              }

              {/* No Replies */}
              {!props.replies.length && !state.showReplyList &&
                <div className="replies-absent">
                  <span className="toggle-item comments">
                    <img src={comment} alt="comments" />
                  </span>
                  <span className="toggle-item no-replies">No replies</span>
                </div>
              }
            </span>
          </div>
        </>
      }

      {/* Replies */}
      {isParent && props.replies.length > 0 && state.showReplyList &&
        <section className="replies">
          <CommentList
            comments={props.replies}
            onLikeComment={props.onLikeComment}
            onEditComment={props.onEditComment}
            onDeleteComment={props.onDeleteComment}
            bestAnswer={props.bestAnswer}
            onEditBestAnswer={props.onEditBestAnswer}
            postAuthorID={props.postAuthorID}
            userName={props.userName}
            userID={props.userID}
            refBestAnswer={props.refBestAnswer}
            uncollapsed={props.uncollapsed}
            type={"replies"}
          />
        </section>
      }

      {/* Secondary Reply Form Toggler */}
      {isParent && !state.showConfirmation && state.showReplyList && props.replies.length > 0 &&
        <>
          <div className="discussion-label replies-label">
            <span className="reply-controls reply-second">

              {/* Add Reply Button */}
              <span className={`reply ${state.showReplyForm ? "reply-active" : ""}`} onClick={toggleReplyForm}>
                <img
                  src={reply}
                  alt="reply"
                />
                REPLY
              </span>

              {/* Show/Hide Replies */}
              {props.replies.length > 0 && state.showReplyList &&
                <div className={`replies-present reply-second ${state.showReplyList ? "replies-active" : ""}`} onClick={toggleReplyList}>
                  <span className="toggle-item comments">
                    <img src={comment} alt="comments" />
                  </span>
                  <span className="toggle-item">
                    {state.showReplyList ? "Hide" : "Show" } Replies {props.replies.length > 0 && `(${props.replies.length})`}
                  </span>
                </div>
              }
            </span>
          </div>
        </>
      }

      <div className="ref" ref={refReplyForm}></div>

      {/* Add Reply Form */}
      {isParent && state.showReplyForm &&
        <>
          <div className="reply-form">
            <CommentForm
              label={"NEW REPLY"}
              userName={props.userName}
              userRole={props.userRole}
              onAddComment={addReply}
              onCancelComment={toggleReplyForm}
            />
          </div>
        </>
      }

    </div>
  );
};

export default CommentListItem;
