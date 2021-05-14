import PropTypes from "prop-types";

const PostListCategory = (props) => {
  PostListCategory.propTypes = {
    posts: PropTypes.array
  };

  return (
    <div className="PostListCategory list">
      {props.posts}
    </div>
  );
};

export default PostListCategory;
