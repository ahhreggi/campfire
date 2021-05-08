import "./CommentListItem.scss";
import ReplyList from "./ReplyList";
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
    endorsed: PropTypes.bool
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
      <ReplyList />
    </div>
  );
};

export default CommentListItem;
