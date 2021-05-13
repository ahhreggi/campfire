import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PostListItem from "./PostListItem";
import TagList from "./TagList";
import Button from "./Button";
import glass from "../images/icons/search.png";
import filter from "../images/icons/settings.png";
import pin from "../images/icons/pin.png";
import star from "../images/icons/star.png";
import question from "../images/icons/paper.png";
import up from "../images/icons/up-arrow.png";
import down from "../images/icons/down-arrow.png";
import "./PostList.scss";

const PostList = (props) => {

  PostList.propTypes = {
    active: PropTypes.string,
    selectedPostID: PropTypes.number,
    posts: PropTypes.array,
    tags: PropTypes.array,
    onClick: PropTypes.func,
    selectedTags: PropTypes.array,
    onTagToggle: PropTypes.func,
    onTagClear: PropTypes.func,
    onNewPost: PropTypes.func
  };

  const [state, setState] = useState({
    showFilters: true,
    showPinned: true,
    showBookmarked: true,
    showPosts: true,
    showSearch: false,
    searchText: ""
  });

  // Uncollapse categories when selecting a filter
  useEffect(() => {
    setState({
      ...state,
      showFilters: true,
      showPinned: true,
      showBookmarked: true,
      showPosts: true
    });
  }, [props.selectedTags]);

  // STATE-AFFECTING FUNCTIONS //////////////////////////////////////

  const toggleSearch = () => {
    console.log("toggling search bar");
    if (!state.showSearch) {
      setState({ ...state, showSearch: true, searchText: "" });
    } else {
      setState({ ...state, showSearch: false, searchText: "" });
    }
  };

  const updateSearchText = (event) => {
    setState({ ...state, searchText: event.target.value });
    console.log(event.target.value);
  };

  const toggleList = (category) => {
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

  // // Sort posts from newest to oldest
  const sortByID = (posts) => {
    return posts.sort((a, b) => {
      return b.id - a.id;
    });
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

  // Sort the posts by descending ID
  const descPinned = sortByID(pinned);
  const descBookmarked = sortByID(bookmarked);
  const descUnpinned = sortByID(unpinned);

  // Sort the pinned posts by bookmark status
  const bookmarkedPinnedPosts = sortByBookmarked(descPinned);

  const pinnedPosts = generatePostListItems(bookmarkedPinnedPosts);
  const bookmarkedPosts = generatePostListItems(descBookmarked);
  const unpinnedPosts = generatePostListItems(descUnpinned);

  ///////////////////////////////////////////////////////////////////


  // TextForm.propTypes = {
  //   label: PropTypes.string,
  //   text: PropTypes.string,
  //   minHeight: PropTypes.string,
  //   onChange: PropTypes.func,
  // };

  return (
    <div className="PostList">

      <div className="post-list-buttons">
        {/* New Post Button */}
        <div className="newPost">
          <Button
            text="new post"
            styles={`new-post ${props.active === "New Post" ? "active" : ""}`}
            onClick={props.onNewPost}
            image={question}
          />
        </div>

        {/* Search Button */}
        <div className="search">
          <Button
            text="search"
            styles={`search ${state.showSearch ? "active" : ""}`}
            onClick={toggleSearch}
            image={glass}
          />
        </div>
      </div>

      {state.showSearch &&
        <div className="search-bar">
          {/* <TextForm
            text={state.searchText}
            onChange={updateSearchText}
          /> */}
          <input className="search-bar"
            value={state.searchText}
            onChange={updateSearchText}
          />
        </div>
      }

      <hr />

      {/* Filters */}
      <div className="filters">
        <div className={`label ${state.showFilters && "active"}`} onClick={() => toggleList("filters")}>
          <div>
            <img className="gear" src={filter} alt="filter" />
            FILTERS
          </div>
          <div className="arrows">
            {state.showFilters && <img src={up} alt="up" />}
            {!state.showFilters && <img src={down} alt="down" />}
          </div>
        </div>
        {state.showFilters &&
          <div className={`tags ${props.selectedTags.length > 0 ? "filtering" : ""}`}>
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
      </div>

      <div className="posts">

        {/* Pinned */}
        <div className="pinned">
          <div className={`label ${state.showPinned ? "active" : ""} ${!pinnedPosts.length ? "empty" : ""}`} onClick={() => toggleList("pinned")}>
            <div>
              <img src={pin} alt="pin" />
              PINNED
            </div>
            <div className="arrows">
              {pinnedPosts.length > 0 && state.showPinned && <img src={up} alt="up" />}
              {pinnedPosts.length > 0 && !state.showPinned && <img src={down} alt="down" />}
            </div>
          </div>
          {state.showPinned &&
            <div className="list">
              {pinnedPosts}
            </div>
          }
        </div>

        {/* Bookmarked */}
        <div className="bookmarked">
          <div className={`label ${state.showBookmarked ? "active" : ""} ${!bookmarkedPosts.length ? "empty" : ""}`} onClick={() => toggleList("bookmarked")}>
            <div>
              <img src={star} alt="bookmark" />
              BOOKMARKED
            </div>
            <div className="arrows">
              {bookmarkedPosts.length > 0 && state.showBookmarked && <img src={up} alt="up" />}
              {bookmarkedPosts.length > 0 && !state.showBookmarked && <img src={down} alt="down" />}
            </div>
          </div>
          {state.showBookmarked &&
            <div className="list">
              {bookmarkedPosts}
            </div>
          }
        </div>

        {/* Posts */}
        <div className="unpinned">
          <div className={`label ${state.showPosts ? "active" : ""} ${!unpinnedPosts.length && "empty"}`} onClick={() => toggleList("posts")}>
            <div>
              <img src={question} alt="question" />
              POSTS
            </div>
            <div className="arrows">
              {unpinnedPosts.length > 0 && state.showPosts && <img src={up} alt="up" />}
              {unpinnedPosts.length > 0 && !state.showPosts && <img src={down} alt="down" />}
            </div>
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
