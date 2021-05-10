import { useState } from "react";
import "./PostList.scss";
import Button from "./Button";
import TagList from "./TagList";
import PostListItem from "./PostListItem";
import pin from "../images/icons/pin.png";
import PropTypes from "prop-types";

const PostList = (props) => {

  PostList.propTypes = {
    selectedPostID: PropTypes.number,
    posts: PropTypes.array,
    tags: PropTypes.array,
    onClick: PropTypes.func
  };

  const [selectedTags, setSelectedTags] = useState([]);

  // TODO: Create functions to add/delete/clear all ids from selectedTags

  // STATE-AFFECTING FUNCTIONS //////////////////////////////////////

  const toggleFilter = (tagID) => {
    console.log("toggle~");
  };

  // HELPER FUNCTIONS ///////////////////////////////////////////////

  // Create PostListItem components with the given array of posts
  const generatePostListItems = (posts) => {
    return posts.map(post => {
      // Get the total number of comments + replies of a post
      const numComments = post.comments
        .map(comment => 1 + comment.replies.length)
        .reduce((a, b) => a + b, 0);
      // Check if a student has commented on the post
      const showStudentBadge = post.comments.filter(comment => comment.role === "student").length > 0;
      // Check if an instructor has commented on the post
      const showInstructorBadge = post.comments.filter(comment => comment.role === "instructor").length > 0;
      return (
        <PostListItem
          key={post.id}
          id={post.id}
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
          onClick={props.onClick}
          selected={props.selectedPostID === post.id}
        />
      );
    });
  };

  // Move all bookmarked posts to the front of the given posts array
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

  // VARIABLES //////////////////////////////////////////////////////

  // If no tags are selected, use all posts, otherwise filter by selected tags
  const filteredPosts = !selectedTags.length ? props.posts : props.posts.filter(post => {
    for (const tag of post.tags) {
      if (selectedTags.includes(tag.id)) {
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

  const pinnedPosts = generatePostListItems(posts.pinned);
  const unpinnedPosts = generatePostListItems(posts.unpinned);

  ///////////////////////////////////////////////////////////////////

  return (
    <div className="PostList">
      <div className="label">
        FILTERS
      </div>
      <div className="tags">
        <TagList
          tags={props.tags}
          selectedTags={[]}
          onClick={toggleFilter}
          styles={"tag filter"}
        />
        {selectedTags.length > 0 && <Button type="tag-clear" text="clear" />}
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

export default PostList;
