import PropTypes from "prop-types";
import CommentListItem from "./CommentListItem";
import "./CommentList.scss";

const CommentList = (props) => {

  CommentList.propTypes = {
    comments: PropTypes.array,
    onLikeComment: PropTypes.func,
    onAddComment: PropTypes.func,
    onEditComment: PropTypes.func,
    onDeleteComment: PropTypes.func,
    bestAnswer: PropTypes.number,
    postAuthorID: PropTypes.number,
    commentAuthorID: PropTypes.number,
    userName: PropTypes.string
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
        onAddComment={props.onAddComment}
        onLikeComment={props.onLikeComment}
        onEditComment={props.onEditComment}
        onDeleteComment={props.onDeleteComment}
        bestAnswer={props.bestAnswer}
        postAuthorID={props.postAuthorID}
        commentAuthorID={comment.user_id}
        userName={props.userName}
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
