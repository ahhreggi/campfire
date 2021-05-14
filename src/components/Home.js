import "./Home.scss";
import PropTypes from "prop-types";

import DevData from "./DevData";

const Home = (props) => {
  Home.propTypes = {
    userData: PropTypes.object,
    userCourses: PropTypes.object
  };
  return (
    <div className="Home">
      Welcome back!
      <DevData name="Home" data={props} />
    </div>
  );
};

export default Home;
