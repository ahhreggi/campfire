import "./PostListItem.scss";
import Bookmark from "./Bookmark";
import Badge from "./Badge";
import Button from "./Button";
import eye from "../images/eye.png";
import comment from "../images/comment.png";
import PropTypes from "prop-types";

const PostListItem = (props) => {
  const numViews = 45;
  const numComments = 13;
  const propTags = [
    {
      id: 1,
      name: "HTML"
    },
    {
      id: 2,
      name: "CSS"
    },
    {
      id: 3,
      name: "React"
    },
  ];
  const tags = propTags.map(tag => {
    return <Button disabled={true} type="tag" key={tag.id} text={tag.name} />;
  });
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
        <div className="tags">
          {tags}
        </div>
        <div className="counters">
          <span className="views">
            <img src={eye} alt="views" />
            {numViews}
          </span>
          <span className="comments">
            <img src={comment} alt="comments" />
            {numComments}
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
