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
    uncollapsed: PropTypes.array,
    type: PropTypes.string // Post uses "comments", CommentListItem uses type replies
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

    // Check if it's an array of comments or an array of replies
    const isComments = props.type === "comments";

    if (isComments) {
      return sortedComments.map(comment => {
        return (
          <CommentListItem

            key={comment.id}
            id={comment.id}
            anonymous={comment.anonymous}
            authorFirstName={comment.author_first_name}
            authorLastName={comment.author_last_name}
            commentAuthorID={comment.author_id}
            avatarID={comment.author_avatar_id}
            parentID={null} // always null for comments
            authorRole={comment.role}
            body={comment.body}
            score={comment.score}
            createdAt={comment.created_at}
            lastModified={comment.last_modified}
            liked={comment.liked}
            endorsed={comment.endorsed}
            editable={comment.editable}
            endorsable={comment.endorsable}
            endorsements={comment.endorsements}
            edits={comment.edits}
            replies={comment.replies}

            onAddComment={props.onAddComment}
            onLikeComment={props.onLikeComment}
            onEditComment={props.onEditComment}
            onDeleteComment={props.onDeleteComment}
            bestAnswer={props.bestAnswer}
            onEditBestAnswer={props.onEditBestAnswer}
            postAuthorID={props.postAuthorID}

            userName={props.userName}
            userRole={props.userRole}
            userID={props.userID}
            refBestAnswer={props.refBestAnswer}
            uncollapsed={props.uncollapsed}
            showReplyList={props.uncollapsed.length && props.uncollapsed.includes(comment.id) ? true : false}

          />
        );
      });
    } else if (props.type === "replies") {
      return sortedComments.map(reply => {
        return (
          <CommentListItem

            key={reply.id}
            id={reply.id}
            parentID={reply.parent_id} // always present for replies
            anonymous={reply.anonymous}
            authorFirstName={reply.author_first_name}
            authorLastName={reply.author_last_name}
            commentAuthorID={reply.author_id}
            avatarID={reply.author_avatar_id}
            authorRole={reply.role}
            body={reply.body}
            score={reply.score}
            createdAt={reply.created_at}
            lastModified={reply.last_modified}
            liked={reply.liked}
            endorsed={reply.endorsements.length > 0} // replies aren't given an endorsed prop
            editable={reply.editable}
            endorsable={reply.endorsable}
            endorsements={reply.endorsements}
            edits={reply.edits}
            replies={null} // replies have no further replies

            onAddComment={props.onAddComment}
            onLikeComment={props.onLikeComment}
            onEditComment={props.onEditComment}
            onDeleteComment={props.onDeleteComment}
            bestAnswer={props.bestAnswer}
            onEditBestAnswer={props.onEditBestAnswer}
            postAuthorID={props.postAuthorID}

            userName={props.userName}
            userRole={props.userRole}
            userID={props.userID}
            refBestAnswer={props.refBestAnswer}
            uncollapsed={props.uncollapsed}
            showReplyList={props.uncollapsed.length && props.uncollapsed.includes(reply.id) ? true : false}

          />
        );
      });
    }

  };

  const comments = getComments(props.comments);

  return (
    <div className="CommentList">
      {comments}
    </div>
  );
};

export default CommentList;
