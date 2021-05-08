import "./PostListItem.scss";
import Bookmark from "./Bookmark";
import Badge from "./Badge";

const PostListItem = () => {
  return (
    <div className="PostListItem">
      <header>
        <div>
          <span className="bookmark">
            <Bookmark />
          </span>
          <span className="title">PostListItem.title</span>
        </div>
        <div className="badges">
          <Badge />
          <Badge />
        </div>
      </header>
      <div>
        {"PostListItem.body PostListItem.body PostListItem.body PostListItem.body PostListItem.body PostListItem.body PostListItem.body PostListItem.body PostListItem.body PostListItem.body "}
      </div>
      <footer>
        <div>
          Category
        </div>
        <div>
          3
          123
        </div>
      </footer>
    </div>
  );
};

export default PostListItem;
