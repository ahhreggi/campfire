import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PostListItem from "./PostListItem";
import TagList from "./TagList";
import Button from "./Button";
import PostListCategory from "./PostListCategory";
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
    posts: PropTypes.array,
    tags: PropTypes.array,
    onClick: PropTypes.func,
    selectedPostID: PropTypes.number,
    selectedTags: PropTypes.array,
    onTagToggle: PropTypes.func,
    onTagClear: PropTypes.func,
    onRedirect: PropTypes.func
  };

  const [state, setState] = useState({
    active: props.active,
    showFilters: true,
    showPinned: true,
    showBookmarked: true,
    showPosts: true,
    showSearch: false,
    searchText: "",
    selectedTags: props.selectedTags,
    pinned: [],
    bookmarked: [],
    unpinned: [],
    posts: props.posts
  });

  // Process posts into categories whenever:
  // - The course's posts change (a post is modified, added, or deleted)
  // - Search or tag filters change
  useEffect(() => {
    processPosts(props.posts, state.selectedTags, state.searchText);
  }, [props.posts, props.active, state.searchText, state.selectedTags]);

  // Uncollapse categories when selecting a filter
  useEffect(() => {
    setState({
      ...state,
      showFilters: true,
      showPinned: true,
      showBookmarked: true,
      showPosts: true,
      selectedTags: props.selectedTags
    });
  }, [props.selectedTags]);

  // If searchText exists, ensure that showfilters is true
  useEffect(() => {
    if (state.searchText && !state.showFilters) {
      setState({ ...state, showFilters: true });
    }
  }, [state.searchText]);

  // STATE-AFFECTING FUNCTIONS //////////////////////////////////////

  // STEPS: Filter by tags & search text, then categorize in state

  // All in one post list processor
  const processPosts = (posts, selectedTags, searchText) => {
    const filteredByTags = filterPostsByTags(posts, selectedTags);
    const filteredBySearchText = filterPostsBySearchText(filteredByTags, searchText);
    categorizePosts(filteredBySearchText);
    // categorizePosts(props.posts);
  };

  const categorizePosts = (posts) => {
    // Categorize posts as pinned or unpinned
    // Priority: pinned > bookmarked > default
    const pinned = [];
    const bookmarked = [];
    const unpinned = [];

    for (const post of posts) {
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

    // Update state
    setState({
      ...state,
      pinned: bookmarkedPinnedPosts,
      bookmarked: descBookmarked,
      unpinned: descUnpinned
    });

  };

  const toggleTag = (tagID) => {
    console.log("hey");
    props.onTagToggle(tagID);
  };

  const onSelectPost = (postID) => {
    props.onClick(postID);
  };

  const toggleSearch = () => {
    console.log("toggling search bar");
    if (!state.showSearch) {
      setState({ ...state, showSearch: true, showFilters: true, searchText: "" });
    } else {
      setState({ ...state, showSearch: false, searchText: "" });
    }
  };

  const clearFilters = () => {
    props.onTagClear();
    setState({ ...state, searchText: "" });
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

  const toggleNewPost = () => {
    props.onRedirect(props.active === "New Post" ? "Dashboard" : "New Post");
  };

  // HELPER FUNCTIONS ///////////////////////////////////////////////

  // Return true if the given comment contains searchText within its body or replies
  const commentContainsText = (comment, searchText) => {
    if (comment.body.includes(searchText)) {
      return true;
    }
    for (const reply of comment.replies) {
      if (reply.body.includes(searchText)) {
        return true;
      }
    }
    return false;
  };

  // Filter posts by the given array of tags
  // If no tags are selected, all posts will be returned
  const filterPostsByTags = (posts, tags = []) => {
    const filteredPosts = !tags.length ? posts : posts.filter(post => {
      // Check if each post has at least one of the selected tags
      for (const tag of post.tags) {
        if (hasTag(tags, tag.id)) {
          return true;
        }
      }
      return false;
    });
    return filteredPosts;
  };

  // Filter posts by the given search text
  // To qualify, a post must:
  // - Contain searchText within its title or body
  // - Contain searchText within any of its comments and their replies
  const filterPostsBySearchText = (posts, searchText) => {
    return posts.filter(post => {
      // Check the post title and body
      if (post.title.includes(searchText) || post.body.includes(searchText)) {
        return true;
        // Check the post's comments and their replies
      } else {
        for (const comment of post.comments) {
          if (commentContainsText(comment, searchText)) {
            return true;
          }
        }
      }
      return false;
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

  // Return true if the given tagID is in tags
  // TODO: Move to helper file (also in Post)
  const hasTag = (tags, tagID) => {
    return tags.filter(tag => tag.id === tagID).length;
  };

  // VARIABLES //////////////////////////////////////////////////////

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
            onClick={toggleNewPost}
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

      {/* Search Bar */}
      {state.showSearch &&
        <div className="search-bar">
          <input className="search-bar"
            value={state.searchText}
            onChange={updateSearchText}
          />
        </div>
      }

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
              onClick={toggleTag}
              styles={"tag filter"}
            />
            {(props.selectedTags.length > 0 || state.searchText) &&
              <>
                <hr />
                <div className="tag-clear">
                  <Button
                    text="clear filters"
                    styles="tag clear"
                    onClick={clearFilters}
                  />
                </div>
              </>
            }
          </div>
        }
      </div>

      <hr />

      <div className="posts">

        {/* Pinned */}
        <div className="pinned">
          <div className={`label ${state.showPinned ? "active" : ""} ${!state.pinned.length ? "empty" : ""}`} onClick={() => toggleList("pinned")}>
            <div>
              <img src={pin} alt="pin" />
              PINNED
            </div>
            <div className="arrows">
              {state.pinned.length > 0 && state.showPinned && <img src={up} alt="up" />}
              {state.pinned.length > 0 && !state.showPinned && <img src={down} alt="down" />}
            </div>
          </div>
          {state.showPinned &&
            <PostListCategory
              posts={state.pinned}
              onClick={onSelectPost}
              selectedPostID={props.selectedPostID}
            />
          }
        </div>

        {/* Bookmarked */}
        <div className="bookmarked">
          <div className={`label ${state.showBookmarked ? "active" : ""} ${!state.bookmarked.length ? "empty" : ""}`} onClick={() => toggleList("bookmarked")}>
            <div>
              <img src={star} alt="bookmark" />
              BOOKMARKED
            </div>
            <div className="arrows">
              {state.bookmarked.length > 0 && state.showBookmarked && <img src={up} alt="up" />}
              {state.bookmarked.length > 0 && !state.showBookmarked && <img src={down} alt="down" />}
            </div>
          </div>
          {state.showBookmarked &&
            <PostListCategory
              posts={state.bookmarked}
              onClick={onSelectPost}
              selectedPostID={props.selectedPostID}
            />
          }
        </div>

        {/* Posts */}
        <div className="unpinned">
          <div className={`label ${state.showPosts ? "active" : ""} ${!state.unpinned.length && "empty"}`} onClick={() => toggleList("posts")}>
            <div>
              <img src={question} alt="question" />
              POSTS
            </div>
            <div className="arrows">
              {state.unpinned.length > 0 && state.showPosts && <img src={up} alt="up" />}
              {state.unpinned.length > 0 && !state.showPosts && <img src={down} alt="down" />}
            </div>
          </div>
          {state.showPosts &&
            <PostListCategory
              posts={state.unpinned}
              onClick={onSelectPost}
              selectedPostID={props.selectedPostID}
            />
          }
        </div>
      </div>

    </div>
  );
};

export default PostList;
