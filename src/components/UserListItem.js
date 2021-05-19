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
    showConfirmation: false,
    showConfirmationStudent: false,
    showConfirmationInstructor: false,
    showConfirmationOwner: false,
  });

  const handleRemove = () => {
    setState({ showConfirmation: true });
  };

  const handleStudent = () => {
    setState({ showConfirmationStudent: true });
  };

  const handleInstructor = () => {
    setState({ showConfirmationInstructor: true });
  };

  const handleOwner = () => {
    setState({ showConfirmationOwner: true });
  };


  const removeUser = () => {
    setState({ showConfirmation: false });
    props.onEditCourse(props.courseID, { roles: { [props.id]: null } }, "manage");
  };

  const giveStudent = () => {
    setState({ showConfirmationStudent: false });
    props.onEditCourse(props.courseID, { roles: { [props.id]: "student" } }, "manage");
  };

  const giveInstructor = () => {
    setState({ showConfirmationInstructor: false });
    props.onEditCourse(props.courseID, { roles: { [props.id]: "instructor" } }, "manage");
  };

  const giveOwner = () => {
    setState({ showConfirmationOwner: false });
    props.onEditCourse(props.courseID, { roles: { [props.id]: "owner" } }, "manage");
  };

  return (
    <div className={`UserListItem ${(state.showConfirmation || state.showConfirmationStudent || state.showConfirmationInstructor || state.showConfirmationOwner) ? "pending" : ""}`}>

      {(!state.showConfirmation && !state.showConfirmationStudent && !state.showConfirmationInstructor && !state.showConfirmationOwner) &&
        <div className="top">

          {/* User Name & Avatar */}
          <div className="user">
            <div className="avatar">
              <img src={`./images/avatars/${props.avatarID}.png`} />
            </div>
            <div className={`name text-truncate ${props.role}`}>
              {props.name}
              {props.role === "owner" &&
                <img src={star} />
              }
            </div>
          </div>

          {/* Owner Controls */}
          <div className="controls">
            {props.userRole === "owner" && props.role === "student" &&
              <Button text="SET AS INSTRUCTOR" styles="form yellow wide" onClick={handleInstructor} />
            }
            {props.userRole === "owner" && props.role === "instructor" &&
              <Button text="SET AS STUDENT" styles="form orange wide" onClick={handleStudent} />
            }
            {props.userRole === "owner" && props.role === "instructor" &&
              <Button text="GIVE OWNERSHIP" styles="form white wide" onClick={handleOwner} />
            }
            {props.userRole === "owner" && props.role !== "owner" &&
              <Button text="REMOVE" styles="form red" onClick={handleRemove} />
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

      {/* Confirm Student */}
      {state.showConfirmationStudent &&
        <div className="confirmation">
          <Confirmation
            message={`Set ${props.name.split(", ").reverse().join(" ")} as a student?`}
            onConfirm={giveStudent}
            onCancel={() => setState({ showConfirmationStudent: false })}
            confirmText={"CONFIRM"}
          />
        </div>
      }

      {/* Confirm Instructor */}
      {state.showConfirmationInstructor &&
        <div className="confirmation">
          <Confirmation
            message={`Set ${props.name.split(", ").reverse().join(" ")} as an instructor?`}
            onConfirm={giveInstructor}
            onCancel={() => setState({ showConfirmationInstructor: false })}
            confirmText={"CONFIRM"}
          />
        </div>
      }

      {/* Confirm Owner */}
      {state.showConfirmationOwner &&
        <div className="confirmation">
          <Confirmation
            message={`Pass course ownership to ${props.name.split(", ").reverse().join(" ")}?`}
            onConfirm={giveOwner}
            onCancel={() => setState({ showConfirmationOwner: false })}
            confirmText={"CONFIRM"}
          />
        </div>
      }

    </div>
  );
};

export default UserListItem;