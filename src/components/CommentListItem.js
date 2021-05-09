import "./CommentListItem.scss";
import Button from "./Button";
import CommentList from "./CommentList";
import PropTypes from "prop-types";

const CommentListItem = (props) => {

  CommentListItem.propTypes = {
    id: PropTypes.number,
    anonymous: PropTypes.bool,
    author: PropTypes.string,
    body: PropTypes.string,
    createdAt: PropTypes.string,
    lastModified: PropTypes.string,
    editable: PropTypes.bool,
    endorsed: PropTypes.bool,
    replies: PropTypes.array
  };

  const editComment = () => {
    console.log("clicked EDIT comment button");
  };

  const deleteComment = () => {
    console.log("clicked DELETE comment button");
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
        endorsed: {props.endorsed ? "true" : "false"}
      </div>
      <div>
        editable: {props.editable ? "true" : "false"}
      </div>
      <div>
        number of replies: {props.replies ? props.replies.length : "you cannot reply to this comment bc this is a reply"}
      </div>
      {props.editable && <Button type="edit" onClick={editComment} text="EDIT" />}
      {props.editable && <Button type="delete" onClick={deleteComment} text="DELETE" />}
      {props.replies && <CommentList comments={props.replies} />}
    </div>
  );
};

export default CommentListItem;
