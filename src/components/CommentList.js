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
    onEditBestAnswer: PropTypes.func,
    postAuthorID: PropTypes.number,
    commentAuthorID: PropTypes.number,
    userName: PropTypes.string
  };

  // Sort an array of comments
  const sortComments = (comments, byMostRecent = true) => {
    if (byMostRecent) {
      return comments.sort((a, b) => b.id - a.id);
    } else {
      return comments.sort((a, b) => a.id - b.id);
    }
  };

  // Sort comments in order (most recent to oldest)
  // const sortedComments = sortComments(props.comments, true); // most recent -> oldest
  const sortedComments = sortComments(props.comments, false); // oldest -> most recent

  const comments = sortedComments.map(comment => {
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
        onEditBestAnswer={props.onEditBestAnswer}
        postAuthorID={props.postAuthorID}
        commentAuthorID={comment.user_id}
        userName={props.userName}
        userIsAuthor={comment.user_is_post_author}
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
