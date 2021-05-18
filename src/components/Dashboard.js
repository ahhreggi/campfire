import PropTypes from "prop-types";
import "./Dashboard.scss";

import DevData from "./DevData";

const Dashboard = (props) => {

  Dashboard.propTypes = {
    courseData: PropTypes.object
  };

  const analytics = props.courseData.analytics;
  return (
    <div className="Dashboard">
      <DevData name={"courseData.analytics"} props={props.courseData.analytics} />
      <DevData name={"courseData.secrets"} props={props.courseData.secrets} />
      <DevData name={"courseData.users"} props={props.courseData.users} />



    </div>
  );
};

Dashboard.propTypes = {

};

export default Dashboard;
