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
    course: PropTypes.object
  };

  // Only one main component can active at a given time

  return (
    <div className="Main">
      {props.active === "post" &&
      <Post
        tags={[]}
      />}
      {props.active === "dashboard" && <Dashboard />}
      {props.active === "analytics" && <Analytics />}
    </div>
  );
};

export default Main;
