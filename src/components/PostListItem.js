import "./PostListItem.scss";
import Bookmark from "./Bookmark";
import Badge from "./Badge";
import Button from "./Button";
import eye from "../images/eye.png";
import comment from "../images/comment.png";
import PropTypes from "prop-types";

const PostListItem = (props) => {
  return (
    <div className="PostListItem">
      <header>
        <div>
          <span className="bookmark">
            <Bookmark bookmarked={true || props.bookmarked} />
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
        <div className="categories">
          <Button disabled={true} type="category" text="HTML" />
          <Button disabled={true} type="category" text="CSS" />
          <Button disabled={true} type="category" text="React" />
        </div>
        <div className="counters">
          <span className="views">
            <img src={eye} alt="views" />
            3
          </span>
          <span className="comments">
            <img src={comment} alt="replies" />
            123
          </span>
        </div>
      </footer>
    </div>
  );
};

PostListItem.propTypes = {
  bookmarked: PropTypes.bool
};

export default PostListItem;
