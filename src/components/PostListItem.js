import "./PostListItem.scss";
import Bookmark from "./Bookmark";
import Badge from "./Badge";
import Button from "./Button";
import eye from "../images/icons/eye.png";
import comment from "../images/icons/comment.png";
import PropTypes from "prop-types";

const PostListItem = (props) => {

  PostListItem.propTypes = {
    key: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
    bestAnswer: PropTypes.number,
    pinned: PropTypes.bool,
    bookmarked: PropTypes.bool,
    tags: PropTypes.array,
    views: PropTypes.number,
    comments: PropTypes.number,
    showStudentBadge: PropTypes.bool,
    showInstructorBadge: PropTypes.bool
  };

  const tags = props.tags.map(tag => {
    return <Button disabled={true} type="tag-disabled" key={tag.id} text={tag.name} />;
  });

  const truncateText = (text, length) => {
    if (text.length > length) {
      let result = "";
      const words = text.split(" ");
      for (const word of words) {
        if (result.length + word.length <= length) {
          result += " " + word;
        } else {
          break;
        }
      }
      result = result.trim();
      return result + (result !== text ? "..." : "");
    } else {
      return text;
    }
  };

  return (
    <div className="PostListItem">
      <header>
        <div className="header-left">
          <span className="bookmark">
            <Bookmark bookmarked={props.bookmarked} />
          </span>
          <span className="title text-truncate">
            {truncateText(props.title, 32)}
          </span>
        </div>
        <div className="header-right">
          {props.showStudentBadge && <Badge type="student" />}
          {props.showInstructorBadge && <Badge type="instructor" />}
          {props.bestAnswer === null && <Badge type="unresolved" />}
        </div>
      </header>
      <div className="summary text-truncate">
        {props.body}
      </div>
      <footer>
        <div className="tags">
          {tags}
        </div>
        <div className="counters">
          <span className="views">
            <img src={eye} alt="views" />
            {props.views}
          </span>
          <span className="comments">
            <img src={comment} alt="comments" />
            {props.comments}
          </span>
        </div>
      </footer>
    </div>
  );
};

export default PostListItem;
