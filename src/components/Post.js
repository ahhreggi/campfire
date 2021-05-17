import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import TagList from "./TagList";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import eye from "../images/icons/eye.png";
import pin from "../images/icons/pin.png";
import star from "../images/icons/star.png";
import reply from "../images/icons/reply.png";
import arrow from "../images/icons/green-arrow.png";
import cross from "../images/icons/cross.png";
import edit from "../images/icons/edit.png";
import trash from "../images/icons/trash.png";
import comment from "../images/icons/comment.png";
import "./Post.scss";

import EditForm from "./EditForm";
import Confirmation from "./Confirmation";

import DevData from "./DevData";

const Post = (props) => {

  Post.propTypes = {
    id: PropTypes.number,
    courseTags: PropTypes.array,
    anonymous: PropTypes.bool,
    author: PropTypes.string,
    authorRole: PropTypes.string,
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
    authorID: PropTypes.number,
    views: PropTypes.number,
    onEditBookmark: PropTypes.func,
    onEditPost: PropTypes.func,
    onDeletePost: PropTypes.func,
    onLikeComment: PropTypes.func,
    onAddComment: PropTypes.func,
    onEditComment: PropTypes.func,
    onDeleteComment: PropTypes.func,
    onTagToggle: PropTypes.func,
    userName: PropTypes.string,
    userRole: PropTypes.string,
    userID: PropTypes.number
  };

  // Get the parent ID of the best answer of the post
  const getBestAnswerParentID = (comments, bestAnswerID) => {
    // First check the parent itself
    for (const parent of comments) {
      if (parent.id === bestAnswerID) {
        return parent.id;
      }
      // Then check its children
      for (const child of parent.replies) {
        // If it's found, return the ID of the parent comment
        if (child.id === bestAnswerID) {
          return parent.id;
        }
      }
    }
  };

  const [state, setState] = useState({
    showForm: false,
    showConfirmation: false,
    showCommentForm: false,
    uncollapsed: [] // TODO: Set this to have the best answer parent ID by default
  });

  // Reset states when switching posts
  useEffect(() => {
    // const uncollapsed = props.bestAnswer ? [getBestAnswerParentID(props.comments, props.bestAnswer)] : [];
    setState({
      ...state,
      showForm: false,
      showConfirmation: false,
      showCommentForm: false,
      uncollapsed: [getBestAnswerParentID(props.comments, props.bestAnswer)]
    });
  }, [props.id, props.comments, props.bestAnswer]);

  // If the comment form is opened, scroll to it
  useEffect(() => {
    if (state.showCommentForm) {
      scrollToCommentForm();
    }
  }, [state.showCommentForm]);

  // STATE-AFFECTING FUNCTIONS //////////////////////////////////////

  // Toggle and reset the comment edit form
  const toggleForm = () => {
    if (!state.showForm) {
      setState({ ...state, showForm: true, showConfirmation: false, showCommentForm: false });
    } else {
      setState({ ...state, showForm: false });
    }
  };

  // Toggle and reset the new reply form
  const toggleCommentForm = () => {
    if (!state.showCommentForm) {
      setState({ ...state, showCommentForm: true, showConfirmation: false, showForm: false });
    } else {
      setState({ ...state, showCommentForm: false });
    }
  };

  // Toggle delete confirmation form
  const toggleConfirmation = () => {
    if (!state.showConfirmation) {
      setState({ ...state, showConfirmation: true, showForm: false, showCommentForm: false });
    } else {
      setState({ ...state, showConfirmation: false });
    }
  };

  const handleClick = (tag) => {
    props.onTagToggle(tag, true);
  };

  // SCROLL HANDLERS ////////////////////////////////////////////////

  // Scroll to comment form
  const refCommentForm = useRef();
  const scrollToCommentForm = () => {
    setTimeout(() => {
      refCommentForm.current.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  // Scroll to best answer
  const refBestAnswer = useRef();
  const scrollToBestAnswer = () => {

    // Get the ID of the top-level comment in which the best answer is found

    let bestAnswerParentID = getBestAnswerParentID(props.comments, props.bestAnswer);

    // Uncollapse parent element of best answer only
    setState({ ...state, uncollapsed: [ bestAnswerParentID ]});
    // // This should re-render CommentList and CommentListItem
    // // Scroll to best answer
    setTimeout(() => {
      refBestAnswer.current.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // New comment toggle handler
  const commentFormScrollHandler = () => {
    if (!state.showCommentForm) {
      toggleCommentForm();
    }
    scrollToCommentForm();
  };

  ///////////////////////////////////////////////////////////////////

  // SERVER-REQUESTING FUNCTIONS ////////////////////////////////////

  // Bookmark/unbookmark the post
  const toggleBookmark = () => {
    props.onEditBookmark(props.id, props.bookmarked);
  };

  // Pin/unpin the post
  const togglePin = () => {
    props.onEditPost(props.id, { pinned: !props.pinned });
  };

  // Select the best answer
  // commentID may be null
  const editBestAnswer = (commentID) => {
    props.onEditPost(props.id, { "best_answer": commentID === props.bestAnswer ? null : commentID });
  };

  // Save the post changes
  const savePost = (data) => {
    const newTags = props.tags.map(tag => tag.id);
    const tagCheck = JSON.stringify(newTags) !== JSON.stringify(data.tags);
    // console.log(JSON.stringify(newTags) !== JSON.stringify(data.tags));
    // Check that changes were actually made
    if ((props.title !== data.title) ||
      (props.body !== data.body) ||
      (props.anonymous !== data.anonymous) ||
      tagCheck) {
      props.onEditPost(props.id, data);
    }
    // Hide edit form
    toggleForm();
  };

  // Delete the post
  const deletePost = () => {
    props.onDeletePost(props.id);
    // Hide confirmation form
    toggleConfirmation();
  };

  // Add a new comment
  const addComment = (data) => {
    const commentData = {
      postID: props.id,
      ...data // contains body, anonymous, and possibly parentID (if reply)
    };
    props.onAddComment(commentData);
    setState({ ...state, showCommentForm: false });
    scrollToCommentForm();
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
      return moment(timestamp).subtract(3, "seconds").fromNow();
    } else {
      return moment(timestamp).subtract(3, "seconds").format("dddd, MMMM Do, YYYY @ h:mm a");
    }
  };

  // Return the length of the longest word in the given string
  const getLongestWordLength = (text) => {
    if (text) {
      return Math.max(...text.split(" ").map(word => word.length));
    }
  };

  // VARIABLES //////////////////////////////////////////////////////

  // Get the author name to display
  const authorName = getAuthorName(props.author, props.anonymous);

  // Get the number of comments for the post
  const numComments = getNumComments(props.comments);

  // Determine if the post was ever modified (title or body only)
  const isModified = props.createdAt !== props.lastModified;

  // Get the timestamp to display
  const timestamp = formatTimestamp(props.lastModified);
  const relativeTimestamp = `(${isModified ? "edited " : ""}${formatTimestamp(props.lastModified, true)})`;

  // Check if word break is needed for the body
  const breakBody = getLongestWordLength(props.body) > 30;

  ///////////////////////////////////////////////////////////////////

  return (
    <div className="Post">

      <DevData name={"Post"} props={props} />


      <div className={`display ${state.showForm || state.showConfirmation ? "preview-mode" : ""}`}>

        {props.bestAnswer &&
          <>
            <div className="resolution-message">

              <div className="header">
                This question has been answered.
              </div>

              <div className="resolution-refs">

                <div className="link" onClick={() => scrollToBestAnswer()}>
                  <img src={arrow} className="arrow" />
                  <span>VIEW BEST ANSWER</span>
                </div>

                {props.authorID === props.userID &&
                  <div className="unresolve" onClick={() => editBestAnswer(props.bestAnswer)}>
                    <img src={cross} className="cross" />
                    <span>MARK AS UNRESOLVED</span>
                  </div>
                }

              </div>

            </div>
            <hr />
          </>
        }

        <header className="status">

          {/* Resolution Status */}
          <div className={`resolution ${props.bestAnswer ? "resolved" : "unresolved"}`}>
            {props.bestAnswer ? "RESOLVED" : "UNRESOLVED" }
          </div>

          {/* Views */}
          <div className="views icon-med">
            <img src={eye} alt="views" />
            {props.views < 0 ? 0 : props.views}
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
            Submitted by <span className={`author ${props.authorRole !== "student" ? "instructor" : ""}`}>{authorName}</span> on {timestamp} <span className={isModified ? "modified" : ""}>{relativeTimestamp}</span>
          </div>
        </div>

        <footer className="post-icons">

          {/* Tag Buttons */}
          <div className="tags">
            <TagList
              tags={props.tags}
              selectedTags={props.tags}
              onClick={handleClick}
              resolved={!!props.bestAnswer}
            />
          </div>

          {/* Pin & Bookmark Togglers */}
          <div className="list-controls">
            {props.pinnable &&
              <span className={`pin icon-large ${!props.pinned && "disabled"}`}>
                <img src={pin} alt="pin" onClick={togglePin} />
              </span>
            }
            <span className={`bookmark icon-large ${!props.bookmarked && "disabled"}`}>
              <img src={star} alt="bookmark" onClick={toggleBookmark} />
            </span>
          </div>

        </footer>

        <hr />

        {/* Post Body */}
        <div className={`post-body ${breakBody && "break"}`}>
          {props.body}
        </div>

      </div>

      {/* Edit Form */}
      {state.showForm &&
        <>
          <EditForm
            label={"EDIT POST"}
            id={props.id}
            title={props.title}
            author={props.author}
            role={props.authorRole}
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
          <Confirmation
            message={"Are you sure you would like to delete this post?"}
            onConfirm={deletePost}
            onCancel={toggleConfirmation}
          />
        </>
      }

      {/* Edit Control Buttons */}
      {props.editable &&
        <div className="controls post-controls icon-large">
          <>
            <img
              className={"icon-large" + (state.showForm ? "" : " disabled")}
              src={edit}
              alt="edit"
              onClick={toggleForm}
            />
            <img
              className={"icon-large" + (state.showConfirmation ? "" : " disabled")}
              src={trash}
              alt="delete"
              onClick={toggleConfirmation}
            />
          </>
        </div>
      }

      <hr />

      {/* Discussion */}
      <div className="discussion">

        {props.comments.length >= 0 &&
          <div
            className={`discussion-label ${!props.comments.length ? "empty" : ""}`}
          >
            <span className="comments">
              <img src={comment} alt="comments" />
            </span>
            Discussions {`(${numComments})`}
          </div>
        }

        {/* First Start Discussion Button */}
        {(props.comments.length > 0) &&
          <div
            className={`start-discussion ${state.showCommentForm ? "active" : ""}`}
            onClick={commentFormScrollHandler}
          >
            <img
              src={reply}
              alt="reply"
            />
            <span>START A NEW DISCUSSION</span>
          </div>
        }

        {/* Comment List */}
        <div className="comment-list">
          <CommentList
            comments={props.comments}
            onLikeComment={props.onLikeComment}
            onAddComment={addComment}
            onEditComment={props.onEditComment}
            onDeleteComment={props.onDeleteComment}
            bestAnswer={props.bestAnswer}
            onEditBestAnswer={editBestAnswer}
            postAuthorID={props.authorID}
            userName={props.userName}
            userID={props.userID}
            userRole={props.userRole}
            refBestAnswer={refBestAnswer}
            uncollapsed={state.uncollapsed}
            type={"comments"}
          />
        </div>


        {/* Secondary Start Discussion Button */}
        <div
          className={`start-discussion ${state.showCommentForm ? "active" : ""}`}
          onClick={toggleCommentForm}
        >
          <img
            src={reply}
            alt="reply"
            onClick={toggleCommentForm}
          />
          <span>START A NEW DISCUSSION</span>
        </div>

        {/* Add Comment Form */}
        {state.showCommentForm &&
          <div className={`comment-form ${props.userRole !== "student" ? "instructor" : ""}`}>
            <CommentForm
              label={"NEW DISCUSSION"}
              userName={props.userName}
              userRole={props.userRole}
              onAddComment={addComment}
              onCancelComment={toggleCommentForm}
            />
          </div>
        }

      </div>

      <div ref={refCommentForm}></div>

    </div>
  );
};

export default Post;
