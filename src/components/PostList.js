import "./PostList.scss";
import PostListItem from "./PostListItem";
import PropTypes from "prop-types";

const PostList = (props) => {
  // Return the total number of comments + replies of a post
  const countComments = (post) => {
    return post.comments
      .map(comment => 1 + comment.replies.length)
      .reduce((a, b) => a + b, 0);
  };
  const posts = props.posts.map(post => {
    return (
      <PostListItem
        key={post.id}
        title={post.title}
        body={post.body}
        bookmarked={post.bookmarked}
        tags={post.tags}
        views={post.views}
        comments={countComments(post)}
      />
    );
  });
  return (
    <div className="PostList">
      {posts}
    </div>
  );
};

PostList.propTypes = {
  posts: PropTypes.array
};

export default PostList;
