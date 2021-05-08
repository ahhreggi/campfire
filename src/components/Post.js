import "./Post.scss";
import Button from "./Button";
import CommentList from "./CommentList";
import PropTypes from "prop-types";

// Receiving: props.post => contains all data for a specific post

const Post = (props) => {

  Post.propTypes = {
    id: PropTypes.number,
    anonymous: PropTypes.bool,
    author: PropTypes.string,
    bestAnswer: PropTypes.number,
    body: PropTypes.string,
    bookmarked: PropTypes.bool,
    comments: PropTypes.array,
    createdAt: PropTypes.string,
    lastModified: PropTypes.string,
    editable: PropTypes.bool,
    tags: PropTypes.array,
    title: PropTypes.string,
    userID: PropTypes.number,
    views: PropTypes.number
  };

  return (
    <div className="Post">
      {props.title}
      {props.body}
      {/* {tags} */}
      {/* displayed if the current user owns the post: */}
      <Button type="edit" text="EDIT" />
      <Button type="delete" text="DELETE" />
      <CommentList comments={[]} />
    </div>
  );
};

export default Post;
