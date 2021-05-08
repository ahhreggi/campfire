import "./PostList.scss";
import Button from "./Button";
import PostListItem from "./PostListItem";
import pin from "../images/icons/pin.png";
import PropTypes from "prop-types";

// Receiving: props.posts, props.tags

const PostList = (props) => {

  // Move all bookmarked posts to the front of the array
  const sortByBookmarked = (posts) => {
    const bookmarked = [];
    const other = [];
    for (const post of posts) {
      if (post.bookmarked) {
        bookmarked.push(post);
      } else {
        other.push(post);
      }
    }
    return bookmarked.concat(other);
  };

  const selected = [1, 5];

  const tags = props.tags.map(tag => {
    return <Button type={`tag-link ${selected.includes(tag.id) ? "selected" : ""}`} key={tag.id} text={tag.name} />;
  });

  // If no tags are selected, use all posts, otherwise filter
  const filteredPosts = !selected.length ? props.posts : props.posts.filter(post => {
    for (const tag of post.tags) {
      if (selected.includes(tag.id)) {
        console.log(selected, tag.id);
        return true;
      }
    }
    return false;
  });

  // Categorize posts as pinned or unpinned
  const pinned = [];
  const unpinned = [];

  for (const post of filteredPosts) {
    if (post.pinned) {
      pinned.push(post);
    } else {
      unpinned.push(post);
    }
  }

  // Sort the posts by bookmark status
  const posts = {
    pinned: sortByBookmarked(pinned),
    unpinned: sortByBookmarked(unpinned)
  };

  const generatePostListItems = (posts) => {
    return posts.map(post => {
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
  };

  const pinnedPosts = generatePostListItems(posts.pinned);
  const unpinnedPosts = generatePostListItems(posts.unpinned);

  // TODO: Add toggler for these

  return (
    <div className="PostList">
      <div className="label">
        FILTERS
      </div>
      <div className="tags">
        {tags}
        <Button type="tag-clear" text="clear" />
      </div>
      <div className="posts">
        <div className="pinned">
          <div className="label">
            PINNED
            <img src={pin} alt="pin" />
          </div>
          <div className="list">
            {pinnedPosts}
          </div>
        </div>
        <div className="unpinned">
          <div className="label">
            POSTS
          </div>
          <div className="list">
            {unpinnedPosts}
          </div>
        </div>
      </div>
    </div>
  );
};

PostList.propTypes = {
  posts: PropTypes.array,
  tags: PropTypes.array
};

export default PostList;
