import { useState, useEffect } from "react";
import "./CommentListItem.scss";
import Button from "./Button";
import CommentList from "./CommentList";
import PostForm from "./PostForm";
import upvote from "../images/icons/heart.png";
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
    bestAnswer: PropTypes.number
  };

  const [state, setState] = useState({
    showForm: false,
    showConfirmation: false,
    showReplies: false,
    previewBody: props.body,
    previewAnonymous: props.anonymous,
    previewAuthor: props.author,
    endorsed: props.endorsed,
    breakBody: false
  });

  // Update previewAuthor when toggling previewAnonymous
  useEffect(() => {
    setState({
      ...state,
      previewAuthor: getAuthorName(props.author, state.previewAnonymous)
    });
  }, [state.previewAnonymous]);

  // Update breakBody when updating previewBody
  useEffect(() => {
    const checkBody = getLongestWordLength(state.previewBody) > 34;
    setState({ ...state, breakBody: checkBody });
  }, [state.previewBody]);

  // STATE-AFFECTING FUNCTIONS //////////////////////////////////////

  // Update the preview body dynamically as the user types
  const updatePreviewBody = (event) => {
    setState({ ...state, previewBody: event.target.value });
  };

  // Update the preview author dynamically as the user toggles its anonymity
  const updatePreviewAnonymous = (event) => {
    setState({ ...state, previewAnonymous: event.target.checked });
  };

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

  const editComment = () => {
    console.log("clicked EDIT comment button");
  };

  const deleteComment = () => {
    console.log("clicked DELETE comment button");
  };

  const toggleAnonymous = () => {
    console.log("clicked TOGGLE ANONYMOUS button");
    setState({ ...state, anonymous: !state.anonymous });
  };

  const endorseComment = () => {
    console.log("clicked ENDORSE button");
    setState({ ...state, endorsed: state.endorsed + 1 });
  };

  // SERVER-REQUESTING FUNCTIONS ////////////////////////////////////

  // Like/unlike the comment
  const toggleLiked = () => {
    props.onLikeComment(props.id);
  };

  // Endorse/unendorse the comment
  const toggleEndorsed = () => {
    props.onEndorseComment(props.id);
  };

  const saveComment = (event) => {
    event.preventDefault();
    console.log("clicked SUBMIT comment button");
    // include anything that can change when an existing comment is edited
    const updatedData = {
      "anonymous": state.anonymous,
      "body": state.previewBody,
      "last_modified": "some new last_modified time",
    };
    props.onEditComment(props.id, updatedData);
  };

  // If anonymous is true, display anonymous
  // Only instructors can view first/last name

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

  // Create the reply list CommentListItem components if it's a parent
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
        // replies={comment.replies} // Child comments shouldn't have any replies
        onEditComment={props.onEditComment}
        bestAnswer={props.bestAnswer}
      />
    );
  });

  ///////////////////////////////////////////////////////////////////

  return (
    <div className={`CommentListItem ${isParent ? "parent" : "child"} ${isInstructor && "instructor"} ${isBestAnswer && "best"}`}>
      <main className={`comment-main ${isParent ? "parent" : "child"}`}>
        {/* this is a {isParent ? "parent" : "child"} */}

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
              <span className="icon endorsements"><img className="medal" src={endorse} alt="endorse" /></span>
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

        {/* Editable Area */}
        {props.editable && state.showForm &&

          <div className="edit-form">


            {/* Edit Preview */}
            {state.showForm &&
              <>
                <hr />
                <div className="preview">

                  <div className="label">
                    PREVIEW
                  </div>

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
                  <div className={`post-body ${state.breakBody && "break"}`}>
                    {state.previewBody}
                  </div>

                </div>
              </>
            }

            {/* Edit Form */}
            {state.showForm &&
              <div className="forms">

                <hr />

                {/* Comment Body Textarea */}
                <PostForm
                  // label="Post Body"
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

            {state.showForm && <hr />}

            {/* Confirmation Buttons */}
            {props.editable &&
              <div className="controls icon-large">
                {state.showForm &&
                  <div className="confirmation">
                    <>
                      <Button
                        text="Save"
                        styles="form green"
                        onClick={saveComment}
                      />
                      <Button
                        text="Cancel"
                        styles="form red"
                        onClick={toggleForm}
                      />
                    </>
                  </div>
                }
                {state.showConfirmation &&
                  <div className="confirmation">
                    <>
                      <Button
                        text="Delete"
                        styles="form red"
                        onClick={deleteComment}
                      />
                      <Button
                        text="Cancel"
                        styles="form"
                        onClick={toggleConfirmation}
                      />
                    </>
                  </div>
                }
              </div>
            }

          </div>
        }

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
