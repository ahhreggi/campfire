import "./CommentList.scss";
import CommentListItem from "./CommentListItem";
import PropTypes from "prop-types";

const CommentList = (props) => {

  CommentList.propTypes = {
    comments: PropTypes.array,
    onLikeComment: PropTypes.func,
    onEditComment: PropTypes.func,
    onDeleteComment: PropTypes.func,
    bestAnswer: PropTypes.number
  };

  const comments = props.comments.map(comment => {
    return (
      <CommentListItem
        key={comment.id}
        id={comment.id}
        parentID={comment.parent_id}
        anonymous={comment.anonymous}
        authorFirstName={comment.author_first_name}
        authorLastName={comment.author_last_name}
        authorRole={comment.role}
        avatarID={comment.author_avatar_id}
        body={comment.body}
        score={comment.score}
        createdAt={comment.created_at}
        lastModified={comment.last_modified}
        liked={comment.liked}
        endorsed={comment.endorsed}
        editable={comment.editable}
        endorsable={comment.endorsable}
        endorsements={comment.endorsements}
        replies={comment.replies}
        onLikeComment={props.onLikeComment}
        onEditComment={props.onEditComment}
        onDeleteComment={props.onDeleteComment}
        bestAnswer={props.bestAnswer}
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
