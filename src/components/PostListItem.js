import "./PostListItem.scss";
import Bookmark from "./Bookmark";
import Badge from "./Badge";

const PostListItem = () => {
  return (
    <div className="PostListItem">
      <header className="d-flex justify-content-between align-items-center border">
        <div>
          <Bookmark />
          PostListItem.title
        </div>
        <div className="badges">
          <Badge />
          <Badge />
        </div>
      </header>
      PostListItem.body
      Category
      3
      123
    </div>
  );
};

export default PostListItem;
