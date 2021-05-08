import "./PostListItem.scss";
import Bookmark from "./Bookmark";
import Badge from "./Badge";
import Button from "./Button";
import pin from "../images/pin.png";
import eye from "../images/eye.png";
import comment from "../images/comment.png";
import PropTypes from "prop-types";

const PostListItem = (props) => {
  const tags = props.tags.map(tag => {
    return <Button disabled={true} type="tag" key={tag.id} text={tag.name} />;
  });
  return (
    <div className="PostListItem">
      <header>
        <div>
          <span className="bookmark">
            <Bookmark bookmarked={props.bookmarked} />
          </span>
          <span className="title">
            {props.title}
            {props.pinned && <img src={pin} alt="pin" />}
          </span>
        </div>
        <div className="badges">
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

PostListItem.propTypes = {
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

export default PostListItem;
