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
        author={`${comment.author_first_name} ${comment.author_last_name}`}
        body={comment.body}
        createdAt={comment.created_at}
        lastModified={comment.last_modified}
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
