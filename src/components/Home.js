import PropTypes from "prop-types";
import Panel from "./Panel";
import "./Home.scss";

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
        Welcome back, <span>{props.userData.firstName}</span>!
      </div>
      <hr />
      <div className="panels">
        <Panel label={"JOIN"} onClick={() => props.onRedirect("Join")} />
        <Panel label={"CREATE"} onClick={() => props.onRedirect("Create")} />
        <Panel label={"MANAGE"} onClick={() => props.onRedirect("Manage")} />
        <Panel label={"ABOUT"} onClick={() => props.onRedirect("About")} />
        <Panel label={"HELP"} onClick={() => props.onRedirect("Help")} />
        <Panel label={"SETTINGS"} onClick={() => props.onRedirect("Settings")} />
      </div>

      <hr />
      <footer>See project on <a href="https://github.com/ahhreggi/campfire" target="_blank" rel="noreferrer">GitHub</a>.</footer>

    </div>
  );
};

export default Home;
