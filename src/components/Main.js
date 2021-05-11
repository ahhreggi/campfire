import "./Main.scss";
import Post from "./Post";
import Dashboard from "./Dashboard";
import Analytics from "./Analytics";
import PropTypes from "prop-types";

const Main = (props) => {

  Main.propTypes = {
    active: PropTypes.string.isRequired,
    courseData: PropTypes.object.isRequired,
    postID: PropTypes.number,
    onEditBookmark: PropTypes.func,
    onEditPost: PropTypes.func,
    onDeletePost: PropTypes.func,
    onLikeComment: PropTypes.func,
    onEditComment: PropTypes.func,
    onDeleteComment: PropTypes.func,
    onTagToggle: PropTypes.func
  };

  // HELPER FUNCTIONS ///////////////////////////////////////////////

  // Return the post for the given postID
  const getPostByID = (posts, postID) => {
    if (postID) {
      return posts.filter(post => post.id === postID)[0];
    }
  };

  // VARIABLES //////////////////////////////////////////////////////

  const post = getPostByID(props.courseData.posts, props.postID);

  ///////////////////////////////////////////////////////////////////

  return (
    <div className="Main">

      {props.active === "Post" &&
        <Post
          id={post.id}
          courseTags={props.courseData.tags}
          anonymous={post.anonymous}
          author={post.author_first_name ? `${post.author_first_name} ${post.author_last_name}` : null }
          bestAnswer={post.best_answer}
          body={post.body}
          pinned={post.pinned}
          bookmarked={post.bookmarked}
          comments={post.comments}
          createdAt={post.created_at}
          lastModified={post.last_modified}
          pinnable={post.pinnable}
          editable={post.editable}
          tags={post.tags}
          title={post.title}
          userID={post.user_id}
          views={post.views}
          onEditBookmark={props.onEditBookmark}
          onEditPost={props.onEditPost}
          onDeletePost={props.onDeletePost}
          onLikeComment={props.onLikeComment}
          onEditComment={props.onEditComment}
          onDeleteComment={props.onDeleteComment}
          onTagToggle={props.onTagToggle}
        />
      }

      {props.active === "Dashboard" && <Dashboard />}

      {props.active === "Analytics" && <Analytics />}

    </div>
  );
};

export default Main;
