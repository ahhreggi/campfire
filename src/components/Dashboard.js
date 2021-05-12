import PropTypes from "prop-types";
import "./Dashboard.scss";

const Dashboard = (props) => {

  Dashboard.propTypes = {
    resolved: PropTypes.string,
    unresolved: PropTypes.string
  };
  return (
    <div className="Dashboard">
      There are currently:
      {props.resolved} resolved questions
      {props.unresolved} unresolved questions

      Post a new question

    </div>
  );
};

Dashboard.propTypes = {

};

export default Dashboard;
