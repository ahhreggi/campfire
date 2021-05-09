import "./Main.scss";
import Post from "./Post";
import Dashboard from "./Dashboard";
import Analytics from "./Analytics";
import PropTypes from "prop-types";

// Receiving: props.active
// TODO:
// If showing "post", props should include props.post (specific data for the selected post)
// If showing "dashboard", props should include props.course (ALL data for the course, including posts, users, etc.)
// If showing "analytics", props should include props.course (ALL data for the course, including posts, users, etc.)
// props should just include props.course for all three ?

const Main = (props) => {

  Main.propTypes = {
    active: PropTypes.string.isRequired,
    courseData: PropTypes.object.isRequired,
    post: PropTypes.object,
    onEditComment: PropTypes.func
  };

  // Only one main component can active at a given time

  return (
    <div className="Main">
      {props.active === "Post" &&
        <Post
          id={props.post.id}
          anonymous={props.post.anonymous}
          author={props.post.anonymous ? "Anonymous" : `${props.post.first_name} ${props.post.last_name}`}
          bestAnswer={props.post.best_answer}
          body={props.post.body}
          bookmarked={props.post.bookmarked}
          comments={props.post.comments}
          createdAt={props.post.created_at}
          lastModified={props.post.last_modified}
          editable={props.post.editable}
          tags={props.post.tags}
          title={props.post.title}
          userID={props.post.user_id}
          views={props.post.views}
          onEditComment={props.onEditComment}
        />
      }
      {props.active === "Dashboard" && <Dashboard />}
      {props.active === "Analytics" && <Analytics />}
    </div>
  );
};

export default Main;
