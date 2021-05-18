import PropTypes from "prop-types";
import Panel from "./Panel";
import Button from "./Button";
import "./Home.scss";

import join from "../images/icons/green-arrow.png";
import create from "../images/icons/edit.png";
import manage from "../images/icons/courses.png";
import about from "../images/icons/star.png";
import help from "../images/icons/question-mark-blue.png";

// import DevData from "./DevData";

const Home = (props) => {
  Home.propTypes = {
    userData: PropTypes.object,
    userCourses: PropTypes.array,
    onClick: PropTypes.func,
    onRedirect: PropTypes.func
  };

  return (
    <div className="Home">

      {/* <DevData name="Home" props={props} /> */}

      <div className="greeting">
        Hello, <span>{props.userData.firstName}</span>!
        <hr />
        <div className="sub">What would you like to do today?</div>
      </div>
      {/* <hr /> */}
      <div className="panels">
        <Panel label={"JOIN"} img={join} onClick={() => props.onRedirect("Join")} />
        <Panel label={"CREATE"} img={create} onClick={() => props.onRedirect("Create")} />
        <Panel label={"MANAGE"} img={manage} onClick={() => props.onRedirect("Manage")} />
        <Panel label={"ABOUT"} img={about} onClick={() => props.onRedirect("GitHub")} />
        <Panel label={"HELP"} img={help} onClick={() => props.onRedirect("Help")} />
        <Panel label={"ACCOUNT"} img={`./images/avatars/${props.userData.avatarID}.png`} onClick={() => props.onRedirect("Account")} />
      </div>

      <hr />
    </div>
  );
};

export default Home;
