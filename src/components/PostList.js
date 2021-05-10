import { useState } from "react";
import "./PostList.scss";
import Button from "./Button";
import TagList from "./TagList";
import PostListItem from "./PostListItem";
import filter from "../images/icons/settings.png";
import pin from "../images/icons/pin.png";
import star from "../images/icons/star.png";
import question from "../images/icons/paper.png";
import PropTypes from "prop-types";

const PostList = (props) => {

  PostList.propTypes = {
    selectedPostID: PropTypes.number,
    posts: PropTypes.array,
    tags: PropTypes.array,
    onClick: PropTypes.func,
    selectedTags: PropTypes.array,
    onTagToggle: PropTypes.func,
    onTagClear: PropTypes.func,
  };

  const [state, setState] = useState({
    showFilters: true,
    showPinned: true,
    showBookmarked: true,
    showPosts: true
  });

  // STATE-AFFECTING FUNCTIONS //////////////////////////////////////

  const toggleList = (category) => {
    console.log("toggling", category);
    if (category === "filters") {
      setState({ ...state, showFilters: !state.showFilters });
    } else if (category === "pinned") {
      setState({ ...state, showPinned: !state.showPinned });
    } else if (category === "bookmarked") {
      setState({ ...state, showBookmarked: !state.showBookmarked });
    } else if (category === "posts") {
      setState({ ...state, showPosts: !state.showPosts });
    }
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
  // Priority: pinned > bookmarked > default
  const pinned = [];
  const bookmarked = [];
  const unpinned = [];

  for (const post of filteredPosts) {
    if (post.pinned) {
      pinned.push(post);
    } else if (post.bookmarked) {
      bookmarked.push(post);
    } else {
      unpinned.push(post);
    }
  }

  // Sort the pinned posts by bookmark status
  const sortedPinnedPosts = sortByBookmarked(pinned);

  const pinnedPosts = generatePostListItems(sortedPinnedPosts);
  const bookmarkedPosts = generatePostListItems(bookmarked);
  const unpinnedPosts = generatePostListItems(unpinned);

  ///////////////////////////////////////////////////////////////////

  return (
    <div className="PostList">

      {/* Filters */}
      <div className="label" onClick={() => toggleList("filters")}>
        <img src={filter} alt="filter" />
        FILTERS
      </div>
      {state.showFilters &&
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
      }

      <div className="posts">

        {/* Pinned */}
        <div className="pinned">
          <div className={`label ${!pinnedPosts.length && "empty"}`} onClick={() => toggleList("pinned")}>
            <img src={pin} alt="pin" />
            PINNED
          </div>
          {state.showPinned &&
            <div className="list">
              {pinnedPosts}
            </div>
          }
        </div>

        {/* Bookmarked */}
        <div className="bookmarked">
          <div className={`label ${!bookmarkedPosts.length && "empty"}`} onClick={() => toggleList("bookmarked")}>
            <img src={star} alt="bookmark" />
            BOOKMARKED
          </div>
          {state.showBookmarked &&
            <div className="list">
              {bookmarkedPosts}
            </div>
          }
        </div>

        {/* Posts */}
        <div className="unpinned">
          <div className={`label ${!unpinnedPosts.length && "empty"}`} onClick={() => toggleList("posts")}>
            <img src={question} alt="question" />
            POSTS
          </div>
          {state.showPosts &&
            <div className="list">
              {unpinnedPosts}
            </div>
          }
        </div>
      </div>

    </div>
  );
};

export default PostList;
