import "./PostList.scss";
import PostListItem from "./PostListItem";
import PropTypes from "prop-types";

const PostList = (props) => {
  // TODO: Sort posts by PINNED > BOOKMARKED > REST
  const postTypes = {
    pinned: [],
    bookmarked: [],
    default: []
  };
  for (const post of props.posts) {
    if (post.pinned) {
      postTypes.pinned.push(post);
    } else if (post.bookmarked) {
      postTypes.bookmarked.push(post);
    } else {
      postTypes.default.push(post);
    }
  }
  const sortedPosts = postTypes.pinned
    .concat(postTypes.bookmarked)
    .concat(postTypes.default);
  const posts = sortedPosts.map(post => {
    // Get the total number of comments + replies of a post
    const numComments = post.comments
      .map(comment => 1 + comment.replies.length)
      .reduce((a, b) => a + b, 0);
    // Check if a student has commented on the post
    const showStudentBadge = post.comments.filter(comment => comment.author_permissions === 0).length > 0;
    // Check if an instructor has commented on the post
    const showInstructorBadge = post.comments.filter(comment => comment.author_permissions === 1).length > 0;
    return (
      <PostListItem
        key={post.id}
        title={post.title}
        body={post.body}
        pinned={post.pinned}
        bookmarked={post.bookmarked}
        bestAnswer={post.best_answer}
        tags={post.tags}
        views={post.views}
        comments={numComments}
        showStudentBadge={showStudentBadge}
        showInstructorBadge={showInstructorBadge}
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
