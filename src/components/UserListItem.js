import { useState } from "react";
import Confirmation from "./Confirmation";
import PropTypes from "prop-types";
import star from "../images/icons/star.png";
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

  const [state, setState] = useState({
    showConfirmation: false
  });

  const handleClick = () => {
    setState({ showConfirmation: true });
  };

  const removeUser = () => {
    props.onEditCourse(props.courseID, { roles: { [props.id]: null } }, "manage");
  };

  const giveOwner = () => {
    props.onEditCourse(props.courseID, { roles: { [props.id]: "owner" } }, "manage");
  };

  const giveInstructor = () => {
    props.onEditCourse(props.courseID, { roles: { [props.id]: "instructor" } }, "manage");
  };

  const giveStudent = () => {
    props.onEditCourse(props.courseID, { roles: { [props.id]: "student" } }, "manage");
  };

  return (
    <div className={`UserListItem ${state.showConfirmation ? "pending" : ""}`}>

      {!state.showConfirmation &&
        <div className="top">

          {/* User Name & Avatar */}
          <div className="user">
            <div className="avatar">
              <img src={`./images/avatars/${props.avatarID}.png`} />
            </div>
            <div className={`name ${props.role}`}>
              {props.name}
              {props.role === "owner" &&
                <img src={star} />
              }
            </div>
          </div>

          {/* User Role */}
          {/* <div className={`role ${props.role}`}>
            {props.role === "owner" ? "HEAD INSTRUCTOR" : props.role.toUpperCase()}
          </div> */}

          {/* Owner Controls */}
          <div className="controls">
            {props.userRole === "owner" && props.role === "student" &&
              <Button text="SET AS INSTRUCTOR" styles="form yellow wide" onClick={giveInstructor} />
            }
            {props.userRole === "owner" && props.role === "instructor" &&
              <Button text="SET AS STUDENT" styles="form orange wide" onClick={giveStudent} />
            }
            {props.userRole === "owner" && props.role === "instructor" &&
              <Button text="GIVE OWNERSHIP" styles="form white wide" onClick={giveOwner} />
            }
            {props.userRole === "owner" && props.role !== "owner" &&
              <Button text="REMOVE" styles="form red" onClick={handleClick} />
            }
          </div>

        </div>
      }

      {/* Confirm Remove */}
      {state.showConfirmation &&
        <div className="confirmation">
          <Confirmation
            message={`Remove ${props.name.split(", ").reverse().join(" ")}?`}
            onConfirm={removeUser}
            onCancel={() => setState({ showConfirmation: false })}
            confirmText={"REMOVE"}
          />
        </div>
      }

    </div>
  );
};

export default UserListItem;