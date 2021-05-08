import "./Post.scss";
import Button from "./Button";
import CommentList from "./CommentList";
import PropTypes from "prop-types";

const Post = (props) => {
  const tags = props.tags.map(tag => {
    return <Button type="tag" key={tag.id} text={tag.name} />;
  });
  return (
    <div className="Post">
      This is Post.
      {tags}
      {/* displayed if the current user owns the post: */}
      <Button type="edit" key="1" text="EDIT" />
      <Button type="delete" key="1" text="DELETE" />
      <CommentList comments={[]} />
    </div>
  );
};

Post.propTypes = {
  tags: PropTypes.array
};

export default Post;
