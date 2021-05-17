import PropTypes from "prop-types";
import "./ManageListItem.scss";

const ManageListItem = (props) => {

  ManageListItem.propTypes = {
    courses: PropTypes.array,
    onLeaveCourse: PropTypes.func,
    onRedirect: PropTypes.func
  };

  return (
    <div className="ManageListItem">

    </div>
  );
};

export default ManageListItem;
