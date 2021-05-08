import "./CommentList.scss";
import CommentListItem from "./CommentListItem";

const CommentList = () => {
  return (
    <div className="CommentList">
      This is CommentList.
      <CommentListItem />
      <CommentListItem />
      <CommentListItem />
    </div>
  );
};

export default CommentList;
