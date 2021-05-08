import "./Main.scss";
import Post from "./Post";
import Dashboard from "./Dashboard";
import Analytics from "./Analytics";
import PropTypes from "prop-types";


const Main = (props) => {

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

Main.propTypes = {
  active: PropTypes.string
};

export default Main;
