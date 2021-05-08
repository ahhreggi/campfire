import "./CommentListItem.scss";
import ReplyList from "./ReplyList";

const CommentListItem = () => {
  return (
    <div className="CommentListItem">
      This is CommentListItem.
      <ReplyList />
    </div>
  );
};

export default CommentListItem;
