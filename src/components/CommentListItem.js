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
    editable: PropTypes.string,
    endorsed: PropTypes.string
  };

  // If anonymous is true, display anonymous
  // Only instructors can view first/last name

  const displayName = props.anonymous ? "Anonymous" : props.author;

  return (
    <div className="CommentListItem">
      <div>
        Author: {displayName}
      </div>
      <div>
        Author (visible only to instructors): {props.author}
      </div>
      <ReplyList />
    </div>
  );
};

export default CommentListItem;
