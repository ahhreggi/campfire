import PropTypes from "prop-types";
import "./UserListItem.scss";

const UserListItem = (props) => {

  UserListItem.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    avatarID: PropTypes.number,
    role: PropTypes.string
  };

  return (
    <div className="UserListItem">

    </div>
  );
};

export default UserListItem;