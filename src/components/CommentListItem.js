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

  return (
    <div className="CommentListItem">
      {props.author}
      <ReplyList />
    </div>
  );
};

export default CommentListItem;
