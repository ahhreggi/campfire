import "./CommentList.scss";
import CommentListItem from "./CommentListItem";
import PropTypes from "prop-types";

const CommentList = (props) => {

  CommentList.propTypes = {
    comments: PropTypes.array
  };

  const comments = props.comments.map(comment => {
    return (
      <CommentListItem key={comment.id} comment={comment} />
    );
  });

  return (
    <div className="CommentList">
      {comments}
    </div>
  );
};

export default CommentList;
