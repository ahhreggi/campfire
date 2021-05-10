import { useState } from "react";
import "./CommentListItem.scss";
import Button from "./Button";
import CommentList from "./CommentList";
import upvote from "../images/icons/upvote.png";
import endorse from "../images/icons/endorse.png";
import edit from "../images/icons/edit.png";
import trash from "../images/icons/trash.png";
import PropTypes from "prop-types";

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
    endorsed: PropTypes.bool,
    editable: PropTypes.bool,
    endorsable: PropTypes.bool,
    endorsements: PropTypes.array,
    replies: PropTypes.array,
    onEdit: PropTypes.func
  };

  const [state, setState] = useState({
    showForm: false,
    showConfirmation: false,
    previewBody: props.body,
    previewAnonymous: props.anonymous,
    previewAuthor: props.author,
    endorsed: props.endorsed,
    breakBody: false
  });

  // STATE-AFFECTING FUNCTIONS //////////////////////////////////////

  const toggleForm = () => {
    console.log("toggled comment form");
    setState({ ...state, showForm: !state.showForm });
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

  const onSave = (event) => {
    event.preventDefault();
    console.log("clicked SUBMIT comment button");
    // include anything that can change when an existing comment is edited
    const updatedData = {
      "anonymous": state.anonymous,
      "body": state.previewBody,
      "last_modified": "some new last_modified time",
    };
    props.onEdit(props.id, updatedData);
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

  // VARIABLES //////////////////////////////////////////////////////

  // Get the author name to display
  const authorName = getAuthorName(props.author, props.anonymous);

  ///////////////////////////////////////////////////////////////////

  return (
    <div className={`CommentListItem ${!props.replies && "reply"}`}>
      <div className="comment-avatar">
        avatarid: {props.avatarID}
      </div>
      <div className="comment-score">
        score: {props.score}
      </div>
      <div className="comment-author">
        {authorName}
      </div>
      <div className="comment-body">
        {props.body}
      </div>
      <footer>
        <div className="comment-timestamp">
          created: {props.createdAt} (last modified: {props.lastModified})
        </div>
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
                onClick={() => console.log("")}
              />
            </>
          </div>
        }
      </footer>
      <div>
        endorsable: {props.endorsable ? "true" : "false"}
      </div>
      <div>
        endorsements: {props.endorsements.length}
      </div>
      <div>
        editable: {props.editable ? "true" : "false"}
      </div>
      <div>
        number of replies: {props.replies ? props.replies.length : "you cannot reply to this comment bc this is a reply"}
      </div>
      <form className="comment-form" onSubmit={onSave}>
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
      {props.replies && props.replies.length === 0 && <div>this comment has no replies yet</div>}
    </div>
  );
};

export default CommentListItem;
