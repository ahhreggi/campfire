import "./PostListItem.scss";
import Bookmark from "./Bookmark";
import Badge from "./Badge";
import Button from "./Button";
import TagList from "./TagList";
import eye from "../images/icons/eye.png";
import comment from "../images/icons/comment.png";
import PropTypes from "prop-types";

const PostListItem = (props) => {

  PostListItem.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
    bestAnswer: PropTypes.number,
    pinned: PropTypes.bool,
    bookmarked: PropTypes.bool,
    tags: PropTypes.array,
    views: PropTypes.number,
    comments: PropTypes.number,
    showStudentBadge: PropTypes.bool,
    showInstructorBadge: PropTypes.bool,
    onClick: PropTypes.func,
    selected: PropTypes.bool
  };

  // STATE-AFFECTING FUNCTIONS //////////////////////////////////////

  const handleClick = () => {
    props.onClick(props.id);
  };

  // HELPER FUNCTIONS ///////////////////////////////////////////////

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

  // VARIABLES //////////////////////////////////////////////////////

  const tags = props.tags.map((tag) => {
    return (
      <Button
        key={tag.id}
        text={tag.name}
        styles="tag disabled"
        onClick={handleClick}
        disabled={true}
      />
    );
  });

  ///////////////////////////////////////////////////////////////////

  return (
    <div
      className={`PostListItem ${props.selected ? "selected" : ""}`}
      onClick={handleClick}
    >

      <header>

        {/* Bookmark Toggler & Title */}
        <div className="header-left">
          <span className="bookmark">
            <Bookmark bookmarked={props.bookmarked} styles="icon-small" />
          </span>
          <span className="title">
            {truncateText(props.title, 32)}
          </span>
        </div>

        {/* Post Status Badges */}
        <div className="header-right">
          {props.showStudentBadge && <Badge type="student" />}
          {props.showInstructorBadge && <Badge type="instructor" />}
          {props.bestAnswer === null && <Badge type="unresolved" />}
        </div>

      </header>

      {/* Post Body Snippet */}
      <div className="summary text-truncate">
        {props.body}
      </div>

      <footer>

        {/* Tag Buttons */}
        <div className="tags">
          <TagList
            tags={props.tags}
            selectedTags={props.tags}
            styles="tag disabled"
            onClick={handleClick}
            truncate={2}
          />
        </div>

        {/* View & Comment Counters */}
        <div className="counters">
          <span className="views icon-small">
            <img src={eye} alt="views" />
            {props.views}
          </span>
          <span className="comments icon-small">
            <img src={comment} alt="comments" />
            {props.comments}
          </span>
        </div>

      </footer>

    </div>
  );
};

export default PostListItem;
