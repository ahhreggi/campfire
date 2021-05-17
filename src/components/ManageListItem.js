import PropTypes from "prop-types";
import "./ManageListItem.scss";

const ManageListItem = (props) => {

  ManageListItem.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    courseCode: PropTypes.string,
    createdAt: PropTypes.string,
    ownerName: PropTypes.string,
    role: PropTypes.string,
    joinDate: PropTypes.string,
    onLeaveCourse: PropTypes.func,
    onRedirect: PropTypes.func
  };

  return (
    <div className="ManageListItem">
      {props.id} - {props.courseCode}
    </div>
  );
};

export default ManageListItem;
