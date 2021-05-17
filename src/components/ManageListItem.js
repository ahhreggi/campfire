import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import Confirmation from "./Confirmation";
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
    onViewCourse: PropTypes.func,
    onRedirect: PropTypes.func
  };

  const [state, setState] = useState({
    showConfirmation: false
  });

  const toggleConfirmation = () => {
    setState({ showConfirmation: !state.showConfirmation });
  };

  return (
    <div className="ManageListItem">
      <div className="code">
        {props.courseCode}
      </div>
      <div className="name">
        {props.name}
      </div>


      <div className="view-button">
        <Button
          text={"VIEW"}
          styles={"form green manage"}
          // may have to change redirect to a course manage page later
          onClick={() => props.onViewCourse(props.id, null, null, "Dashboard")}
        />
      </div>
      {props.role === "owner" &&
        <div className="manage-button">
          <Button
            text={"MANAGE"}
            styles="form yellow manage"
            onClick={props.role === "owner" ? () => props.onViewCourse(props.id, null, null, "Course Settings") : null}
            disabled={props.role !== "owner"}
          />
        </div>
      }
      {props.role !== "owner" &&
        <div className="leave-button">
          <Button
            text={"UNENROLL"}
            styles="form red manage"
            onClick={props.role !== "owner" ? () => toggleConfirmation() : null}
            disabled={props.role === "owner"}
          />
        </div>
      }
      {state.showConfirmation && props.role !== "owner" &&
        <div className="confirmation">
          <Confirmation
            message={`Are you sure you would like to unenroll from ${props.courseCode}?`}
            onConfirm={() => props.onLeaveCourse(props.id)}
            onCancel={toggleConfirmation}
          />
        </div>
      }





    </div>
  );
};

export default ManageListItem;
