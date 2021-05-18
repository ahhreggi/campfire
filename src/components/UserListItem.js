import PropTypes from "prop-types";
import Button from "./Button";
import "./UserListItem.scss";

const UserListItem = (props) => {

  UserListItem.propTypes = {
    courseID: PropTypes.number,
    id: PropTypes.number,
    name: PropTypes.string,
    avatarID: PropTypes.number,
    role: PropTypes.string,
    onRemoveUser: PropTypes.func,
    onEditCourse: PropTypes.func,
    userRole: PropTypes.string
  };

  const removeUser = () => {
    const data = {
      roles: { [props.id]: null }
    };
    props.onRemoveUser(props.courseID, props.id);
  };

  return (
    <div className="UserListItem">
      <div className="user">
        <div className="avatar">
          <img src={`./images/avatars/${props.avatarID}.png`} />
        </div>
        <div className={`name ${props.role}`}>
          {props.name}
        </div>
      </div>
      <div className={`role ${props.role}`}>
        {props.role === "owner" ? "HEAD INSTRUCTOR" : props.role.toUpperCase()}
      </div>

      <div className="controls">
        {props.userRole === "owner" &&
          <Button text="REMOVE" styles="form red" onClick={() => removeUser()} />
        }
      </div>
    </div>
  );
};

export default UserListItem;