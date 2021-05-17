import PropTypes from "prop-types";
import ManageListItem from "./ManageListItem";
import "./ManageList.scss";

const ManageList = (props) => {

  ManageList.propTypes = {
    courses: PropTypes.array,
    onLeaveCourse: PropTypes.func,
    onRedirect: PropTypes.func
  };

  return (
    <div className="ManageList">

    </div>
  );
};

export default ManageList;
