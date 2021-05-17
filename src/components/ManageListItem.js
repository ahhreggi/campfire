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
      <div className="code">
        {props.courseCode}
      </div>
      <div className="name">
        {props.name}
      </div>
    </div>
  );
};

export default ManageListItem;
