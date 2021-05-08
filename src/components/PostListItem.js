import "./PostListItem.scss";
import Bookmark from "./Bookmark";
import Badge from "./Badge";

const PostListItem = () => {
  return (
    <div className="PostListItem">
      <header>
        <div>
          <span className="bookmark">
            <Bookmark bookmarked={true} />
          </span>
          <span className="title">PostListItem.title</span>
        </div>
        <div className="badges">
          {true && <Badge type="instructor" />}
          {true && <Badge type="student" />}
        </div>
      </header>
      <div className="summary text-truncate">
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
