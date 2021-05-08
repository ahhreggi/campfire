import "./CommentList.scss";
import CommentListItem from "./CommentListItem";
import PropTypes from "prop-types";

const CommentList = (props) => {

  CommentList.propTypes = {
    comments: PropTypes.array
  };

  const comments = props.comments.map(comment => {
    console.log(comment);
    return (
      <CommentListItem
        key={comment.id}
        id={comment.id}
        anonymous={comment.anonymous}
        author={`${comment.first_name} ${comment.last_name}`}
        body={comment.body}
        createdAt={comment.createdAt}
        lastModified={comment.lastModified}
        editable={comment.editable}
        endorsed={comment.endorsed}
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
