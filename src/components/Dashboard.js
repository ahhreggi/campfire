import PropTypes from "prop-types";
import Panel from "./Panel";
import "./Dashboard.scss";

import DevData from "./DevData";

const Dashboard = (props) => {

  Dashboard.propTypes = {
    userData: PropTypes.object,
    courseData: PropTypes.object,
    onRedirect: PropTypes.func
  };

  return (
    <div className="Dashboard">

      {/* <DevData name="Home" props={props} /> */}

      <div className="greeting">
        Welcome back to the course, <span>{props.userData.firstName}</span>!
        <hr />
        <div className="sub">What would you like to do today?</div>
      </div>
      {/* <hr /> */}
      <div className="panels">
        <Panel label={"JOIN"} img={""} onClick={() => props.onRedirect("Join")} />
        <Panel label={"CREATE"} img={""} onClick={() => props.onRedirect("Create")} />
        <Panel label={"MANAGE"} img={""} onClick={() => props.onRedirect("Manage")} />
        <Panel label={"ABOUT"} img={""} onClick={() => props.onRedirect("About")} />
        <Panel label={"HELP"} img={""} onClick={() => props.onRedirect("Help")} />
        <Panel label={"SETTINGS"} img={""} onClick={() => props.onRedirect("Settings")} />
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

Dashboard.propTypes = {

};

export default Dashboard;
