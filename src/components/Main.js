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
    active: PropTypes.string,
    courseData: PropTypes.object,
    post: PropTypes.number
  };

  // Only one main component can active at a given time

  // Get data for the given postID
  const postData = props.courseData.posts.filter(post => post.id === props.post)[0];

  return (
    <div className="Main">
      {props.active === "post" && <Post {...postData} />}
      {props.active === "dashboard" && <Dashboard />}
      {props.active === "analytics" && <Analytics />}
    </div>
  );
};

export default Main;
