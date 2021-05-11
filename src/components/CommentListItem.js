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

  // Return the length of the longest word in the given string
  const getLongestWordLength = (text) => {
    return Math.max(...text.split(" ").map(word => word.length));
  };

  // Return the creation timestamp or Last modified: <timestamp> if it was modified
  const getCommentTimestamp = () => {
    const isModified = props.createdAt !== props.lastModified;
    const timestamp = isModified ? props.lastModified : props.createdAt;
    const result = `${isModified ? "Last modified: " : ""} ${formatTimestamp(timestamp)}`;
    return `${result} (${formatTimestamp(timestamp, true)})`;
  };

  // VARIABLES //////////////////////////////////////////////////////

  // Check if the comment is a parent
  const isParent = !props.parentID;

  // Check if the comment is by an instructor
  const isInstructor = props.authorRole !== "student";

  // Check if the comment is selected as the best answer
  const isBestAnswer = props.bestAnswer === props.id;

  // Get the author name to display
  const authorName = getAuthorName(props.author, props.anonymous);

  // Get the timestamp to display
  const timestamp = getCommentTimestamp();

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
        bestAnswer={props.bestAnswer}
      />
    );
  });

  ///////////////////////////////////////////////////////////////////

  return (
    <div className="CommentListItem">

      {/* Top-level Comment */}
      <main className="top">
        <section className="left">

          {/* Avatar */}
          <div className="avatar">
            <img src={`./images/avatars/${props.avatarID}.png`} alt="avatar" />
          </div>

          {/* Engagements */}
          <div className="engagements">

            {/* Likes */}
            <div className="likes">
              <span className="heart">
                <img src={like} alt="like" />
              </span>
              <span className="counter">
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
              <span className="medal">
                <img className="medal" src={endorse} alt="endorse" />
              </span>
              <span className="counter">
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
          <header>

            {/* Author */}
            <div className="author">

            </div>

            {/* Best Answer Label */}
            <div className="label">

            </div>

          </header>

          {/* Comment Body */}
          <div className="body">
          </div>

          {/* Comment Footer */}
          <footer>

            {/* Timestamp */}
            <div className="timestamp">

            </div>

            {/* Controls */}
            <div className="controls">

              <span className="edit"></span>
              <span className="delete"></span>

            </div>

          </footer>

        </section>
      </main>

      {/* Replies */}
      {isParent &&
        <section className="replies">
          {/* < CommentList here > */}
        </section>
      }


        <div className="comment-display">

          <section className="left">

            {/* Comment Avatar */}
            <div className="comment-avatar">
              <img src={`./images/avatars/${props.avatarID}.png`} alt="avatar" />
            </div>

            {/* Comment Likes */}
            <div className={`comment-counter ${props.liked ? "active" : ""}`}>
              <span className="icon"><img src={upvote} alt="upvote" />
              </span>
              <span className="number">{props.score}</span>
              <span className="icon">
                <img
                  className="score-control"
                  src={props.liked ? minus : plus}
                  alt="plus"
                  onClick={toggleLiked}
                />
              </span>
            </div>

            {/* Comment Endorsements */}
            <div className={`comment-counter ${props.endorsed ? "active" : ""}`}>
              <span className="icon endorsements">
                <img className="medal" src={endorse} alt="endorse" />
              </span>
              <span className="number">{props.endorsements.length}</span>
              <span className="icon endorsements toggle">
                <img
                  className="score-control"
                  src={props.endorsed ? minus : plus}
                  alt="plus"
                  onClick={toggleEndorsed}
                />
              </span>
            </div>

          </section>

          <section className="right">

            <div>

              {/* Comment Author */}
              <div className="comment-author">
                {authorName}
                {isBestAnswer &&
                <div className="best">
                  <img src={checkmark} alt="checkmark" />
                  BEST ANSWER
                </div>
                }
              </div>

              {/* Comment Body */}
              <div className="comment-body">
                {props.body}
              </div>

            </div>

            <footer>

              {/* Comment Timestamp/Last Modified */}
              <div className={`comment-timestamp ${props.createdAt !== props.lastModified && "modified"}`}>
                {timestamp}
              </div>

              {/* Comment Edit Controls */}
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

            </footer>

          </section>

        </div>

        <section>

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

        </section>

      </main>












      {/* <form className="comment-form" onSubmit={saveComment}>
        <label>
          write something:
        </label>
        <input type="submit" value="Save Changes" />
      </form>

      {state.showForm && <input type="text" value={"comment text..."} onChange={(event) => console.log("clicked!")} />}
      {props.endorsable && <Button type="endorse" onClick={endorseComment} text="ENDORSE" />}
      {props.editable && <Button type="toggle-anon" onClick={toggleAnonymous} text="TOGGLE ANONYMOUS" /> }
      {props.editable && <Button type="edit" onClick={editComment} text="EDIT" />}
      {props.editable && <Button type="delete" onClick={deleteComment} text="DELETE" />}
      {props.replies && props.replies.length > 0 && <CommentList comments={props.replies} />}
      {props.replies && props.replies.length === 0 && <div>this comment has no replies yet</div>} */}


      {/* Replies */}
      {isParent &&
        <div className="comment-replies">
          {replies}
        </div>
      }

    </div>
  );
};

export default CommentListItem;
