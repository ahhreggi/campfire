import { useState } from "react";
import "./CommentListItem.scss";
import Button from "./Button";
import CommentList from "./CommentList";
import PropTypes from "prop-types";

const CommentListItem = (props) => {

  const [commentText, setCommentText] = useState("");
  const [state, setState] = useState({
    anonymous: props.anonymous,
    commentText: props.body,
    endorsements: props.endorsements
  });

  CommentListItem.propTypes = {
    id: PropTypes.number,
    anonymous: PropTypes.bool,
    author: PropTypes.string,
    body: PropTypes.string,
    createdAt: PropTypes.string,
    lastModified: PropTypes.string,
    editable: PropTypes.bool,
    endorsements: PropTypes.array,
    replies: PropTypes.array,
    onEdit: PropTypes.func
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

  const onSave = (event) => {
    event.preventDefault();
    console.log("clicked SUBMIT comment button");
    // include anything that can change when an existing comment is edited
    const updatedData = {
      "anonymous": state.anonymous,
      "body": state.commentText,
      "last_modified": "some new last_modified time",
    };
    props.onEdit(props.id, updatedData);
  };

  // If anonymous is true, display anonymous
  // Only instructors can view first/last name

  return (
    <div className="CommentListItem">
      <div>
        Author: {props.anonymous ? "Anonymous" : props.author}
      </div>
      <div>
        Author (visible only to instructors): {props.author}
      </div>
      <div>
        {props.body}
      </div>
      <div>
        created: {props.createdAt} (last modified: {props.lastModified})
      </div>
      <div>
        endorsements: {props.endorsements}
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
          <input type="text" value={commentText} onChange={(event) => setCommentText(event.target.value)} />
          <Button type="toggle-anon" onClick={toggleAnonymous} text="TOGGLE ANONYMOUS" />
        </label>
        <input type="submit" value="Save Changes" />
      </form>
      {props.editable && <Button type="edit" onClick={editComment} text="EDIT" />}
      {props.editable && <Button type="delete" onClick={deleteComment} text="DELETE" />}
      {props.replies && <CommentList comments={props.replies} />}
    </div>
  );
};

export default CommentListItem;
