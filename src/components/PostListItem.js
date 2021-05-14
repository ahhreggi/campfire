import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Badge from "./Badge";
import TagList from "./TagList";
import star from "../images/icons/star.png";
import comment from "../images/icons/comment.png";
import eye from "../images/icons/eye.png";
import "./PostListItem.scss";

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
    selectedPostID: PropTypes.number
  };

  const [state, setState] = useState({
    selected: props.selectedPostID === props.id
  });

  useEffect(() => {
    setState({
      selected: props.selectedPostID === props.id
    });
  }, [props.selectedPostID]);

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

  // Get class names
  const classes = classNames({
    PostListItem: true,
    pinned: props.pinned,
    bookmarked: props.bookmarked,
    selected: state.selected
  });

  ///////////////////////////////////////////////////////////////////

  return (
    <div
      className={classes}
      onClick={handleClick}
    >

      <header>
        {state.selected ? "yes" : "no"}
        {/* Post Title */}
        <div className="header-left">
          {/* {props.pinned &&
            <img className="pin" src={pin} alt="pin" />
          } */}
          {props.bookmarked &&
            <img className="bookmark" src={star} alt="bookmark" />
          }
          <span className="title">
            {truncateText(props.title, 30)}
          </span>
        </div>

        {/* Post Status Badges */}
        <div className="header-right">
          {/* {props.showStudentBadge && <Badge type="student" />} */}
          {props.showInstructorBadge && <Badge type="instructor" />}
          {props.bestAnswer && <Badge type="student" />}
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
