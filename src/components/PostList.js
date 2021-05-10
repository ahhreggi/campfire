import { useState } from "react";
import "./PostList.scss";
import Button from "./Button";
import TagList from "./TagList";
import PostListItem from "./PostListItem";
import pin from "../images/icons/pin.png";
import star from "../images/icons/star.png";
import PropTypes from "prop-types";

const PostList = (props) => {

  PostList.propTypes = {
    selectedPostID: PropTypes.number,
    posts: PropTypes.array,
    tags: PropTypes.array,
    onClick: PropTypes.func,
    selectedTags: PropTypes.array,
    onTagToggle: PropTypes.func,
    onTagClear: PropTypes.func
  };

  // TODO: Create functions to add/delete/clear all ids from selectedTags

  // STATE-AFFECTING FUNCTIONS //////////////////////////////////////

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

  // Return true if the given tagID is in tags
  // TODO: Move to helper file (also in Post)
  const hasTag = (tags, tagID) => {
    return tags.filter(tag => tag.id === tagID).length;
  };

  // If no tags are selected, use all posts, otherwise filter by selected tags
  const filteredPosts = !props.selectedTags.length ? props.posts : props.posts.filter(post => {
    // Check if each post has at least one of the selected tags
    for (const tag of post.tags) {
      if (hasTag(props.selectedTags, tag.id)) {
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

      {/* Filters */}
      <div className="label">
        FILTERS
      </div>
      <div className="tags">
        <TagList
          tags={props.tags}
          selectedTags={props.selectedTags}
          onClick={props.onTagToggle}
          styles={"tag filter"}
        />
        {props.selectedTags.length > 0 &&
          <>
            <hr />
            <div className="tag-clear">
              <Button
                text="clear filters"
                styles="tag clear"
                onClick={props.onTagClear}
              />
            </div>
          </>
        }
      </div>
      <div className="posts">

        {/* Pinned */}
        <div className="pinned">
          <div className="label">
            <img className="pin" src={pin} alt="pin" />
            PINNED
          </div>
          <div className="list">
            {pinnedPosts}
          </div>
        </div>

        {/* Bookmarked */}
        <div className="bookmarked">
          <div className="label">
            <img className="star" src={star} alt="bookmark" />
            BOOKMARKED
          </div>
        </div>

        {/* Posts */}
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
