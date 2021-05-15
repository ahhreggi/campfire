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
    userName: PropTypes.string,
    userID: PropTypes.number,
    userRole: PropTypes.string,
    refBestAnswer: PropTypes.object,
    uncollapsed: PropTypes.array
  };

  // Sort an array of comments
  const sortComments = (comments, byMostRecent = true) => {
    if (byMostRecent) {
      return comments.sort((a, b) => b.id - a.id);
    } else {
      return comments.sort((a, b) => a.id - b.id);
    }
  };

  const getComments = (comments) => {

    // Sort comments in order (most recent to oldest)
    // const sortedComments = sortComments(props.comments, true); // most recent -> oldest
    let sortedComments = sortComments(comments, false); // oldest -> most recent

    return sortedComments.map(comment => {
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
          commentAuthorID={comment.author_id}
          userName={props.userName}
          userRole={props.userRole}
          userID={props.userID}
          refBestAnswer={props.refBestAnswer}
          uncollapsed={props.uncollapsed}
          showReplyList={props.uncollapsed.length && props.uncollapsed.includes(comment.id) ? true : false}
        />
      );
    });

  };

  const comments = getComments(props.comments);

  return (
    <div className="CommentList">
      {comments}
    </div>
  );
};

export default CommentList;
