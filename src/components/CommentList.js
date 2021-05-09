import "./CommentList.scss";
import CommentListItem from "./CommentListItem";
import PropTypes from "prop-types";

const CommentList = (props) => {

  CommentList.propTypes = {
    comments: PropTypes.array,
    onEditComment: PropTypes.func
  };

  const comments = props.comments.map(comment => {
    return (
      <CommentListItem
        key={comment.id}
        id={comment.id}
        anonymous={comment.anonymous}
        author={`${comment.author_first_name} ${comment.author_last_name}`}
        body={comment.body}
        createdAt={comment.created_at}
        lastModified={comment.last_modified}
        editable={comment.editable}
        endorsements={comment.endorsements}
        replies={comment.replies}
        onEdit={props.onEditComment}
      />
    );
  });

  return (
    <div className="CommentList">
      {comments}
    </div>
  );
};

export default CommentList;
