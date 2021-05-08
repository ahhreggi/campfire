import "./Post.scss";
import Button from "./Button";
import CommentList from "./CommentList";
import PropTypes from "prop-types";

const Post = (props) => {

  Post.propTypes = {
    id: PropTypes.number,
    tags: PropTypes.array
  };

  const tags = props.tags.map(tag => {
    return <Button type="tag" key={tag.id} text={tag.name} />;
  });
  return (
    <div className="Post">
      This is Post.
      {tags}
      {/* displayed if the current user owns the post: */}
      <Button type="edit" text="EDIT" />
      <Button type="delete" text="DELETE" />
      <CommentList comments={[]} />
    </div>
  );
};

export default Post;
