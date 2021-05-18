import PropTypes from "prop-types";
import Panel from "./Panel";
import Summary from "./Summary";
import "./Dashboard.scss";

import about from "../images/icons/about.png";
import post from "../images/icons/paper.png";
import secret from "../images/icons/key.png";
import manage from "../images/icons/endorse.png";
import analytics from "../images/icons/analytics.png";
import settings from "../images/icons/settings.png";

import DevData from "./DevData";

const Dashboard = (props) => {

  Dashboard.propTypes = {
    userData: PropTypes.object,
    userRole: PropTypes.string,
    onRedirect: PropTypes.func,
    courseCode: PropTypes.string,
    courseName: PropTypes.string,
    analytics: PropTypes.object
  };

  return (
    <div className="Dashboard">

      {/* <DevData name="Home" props={props} /> */}

      <div className="greeting">
        <div>{props.courseCode}: {props.courseName}</div>
        <hr />
        <div>
          <Summary
            onRedirect={props.onRedirect}
            resolved={props.analytics.num_resolved_posts}
            unresolved={props.analytics.num_unresolved_posts}
            unread={props.analytics.num_unread_posts}
          />
        </div>
        <hr />
      </div>
      {/* <hr /> */}
      <div className="panels">
        <Panel label={"NEW POST"} img={post} onClick={() => props.onRedirect("New Post")} />
        <Panel label={"ANALYTICS"} img={analytics} onClick={() => props.onRedirect("Analytics")} />
        <Panel label={"INFO"} img={about} onClick={() => props.onRedirect("Info")} />
        <Panel label={"MANAGE"} img={manage} onClick={() => props.onRedirect("Manage Course")} />
        <Panel label={"ACCESS"} img={secret} onClick={() => props.onRedirect("Access")} />
        <Panel label={"SETTINGS"} img={settings} onClick={() => props.onRedirect("Settings")} />
        {/* <Panel label={"ABOUT"} img={""} onClick={() => props.onRedirect("About")} />
        <Panel label={"HELP"} img={""} onClick={() => props.onRedirect("Help")} />
        <Panel label={"SETTINGS"} img={settings} onClick={() => props.onRedirect("Settings")} /> */}
      </div>

      <hr />
    </div>
  );


  // const analytics = props.courseData.analytics;
  // return (
  //   <div className="Dashboard">
  //     {/* <DevData name={"courseData.analytics"} props={props.courseData.analytics} />
  //     <DevData name={"courseData.secrets"} props={props.courseData.secrets} />
  //     <DevData name={"courseData.users"} props={props.courseData.users} /> */}
  //   </div>
  // );

};

export default Dashboard;
