import PropTypes from "prop-types";
import Panel from "./Panel";
import moment from "moment";
import "./Home.scss";

import join from "../images/icons/green-arrow.png";
import create from "../images/icons/edit.png";
import manage from "../images/icons/courses.png";
import about from "../images/icons/pin.png";
import help from "../images/icons/question-mark-blue.png";

const Home = (props) => {
  Home.propTypes = {
    status: PropTypes.string,
    userData: PropTypes.object,
    userCourses: PropTypes.array,
    onClick: PropTypes.func,
    onRedirect: PropTypes.func
  };

  // Check if the user is new (joined within 30 seconds)
  const newUser = moment().diff(moment(props.userData.joinDate)) < 5000;

  return (
    <div className="Home">

      {props.status}

      <div className="greeting">

        {!newUser &&
          <>Welcome back, <span>{props.userData.firstName}</span>!</>
        }

        {newUser &&
          <>
            Welcome to Campfire, <span>{props.userData.firstName}</span>!
            <div className="new sub">
              If you need help getting started, check out the <span className="link faq" onClick={() => props.onRedirect("Help")}><img src={help} />FAQ</span>.
            </div>
          </>
        }

        <hr />
        <div className="sub">What would you like to do today?</div>
      </div>

      <div className="panels">
        <Panel label={"JOIN"} img={join} onClick={() => props.onRedirect("Join")} />
        <Panel label={"CREATE"} img={create} onClick={() => props.onRedirect("Create")} />
        <Panel label={"MANAGE"} img={manage} onClick={() => props.onRedirect("Manage")} />
        <Panel label={"ACCOUNT"} img={`./images/avatars/${props.userData.avatarID}.png`} onClick={() => props.onRedirect("Account")} />
        <a href="https://github.com/ahhreggi/campfire" target="_blank" rel="noreferrer">
          <Panel label={"README"} img={about} />
        </a>
        <Panel label={"FAQ"} img={help} onClick={() => props.onRedirect("Help")} />
      </div>

      <hr />
    </div>
  );
};

export default Home;
