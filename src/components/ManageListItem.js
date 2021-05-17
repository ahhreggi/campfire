import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import Confirmation from "./Confirmation";
import "./ManageListItem.scss";
import moment from "moment";

const ManageListItem = (props) => {

  ManageListItem.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    courseCode: PropTypes.string,
    createdAt: PropTypes.string,
    ownerName: PropTypes.string,
    role: PropTypes.string,
    joinDate: PropTypes.string,
    archived: PropTypes.bool,
    onLeaveCourse: PropTypes.func,
    onViewCourse: PropTypes.func,
    onRedirect: PropTypes.func
  };

  const [state, setState] = useState({
    showConfirmation: false
  });

  // STATE-AFFECTING FUNCTIONS //////////////////////////////////////

  const toggleConfirmation = () => {
    setState({ showConfirmation: !state.showConfirmation });
  };

  // VARIABLES //////////////////////////////////////////////////////

  const isEnrolled = props.joinDate;

  const joinedString = isEnrolled ? moment(props.joinDate).format("YYYY/MM/DD") : "UNENROLLED";

  const roleString = props.role === "owner" || props.role === "admin" ? props.role + " (instructor)" : props.role;

  ///////////////////////////////////////////////////////////////////

  return (
    <div className={`ManageListItem ${state.showConfirmation ? "center" : ""} ${props.role}`}>

      {/* Default Course List Item */}
      {!state.showConfirmation &&
        <>

          <div className="left">

            {/* Role & Timestamp */}
            <div className={`role ${props.role}`}>
              {roleString}
              <span className="joined">
                {joinedString}
              </span>
            </div>

            {/* Course Code/Label */}
            <div className={`code ${props.archived ? "archived" : ""}`}>
              {props.courseCode}
            </div>

            {/* Course Name */}
            <div className="name text-truncate">
              {props.name}
            </div>

            {/* Course Head Instructor (owner) */}
            <div className="owner-name">
              {props.ownerName || "Unknown Instructor"}
            </div>
          </div>

          {/* Controls */}
          <div className="right">
            <div className="buttons">

              {/* View Button */}
              <div className="view-button">
                <Button
                  text={"VIEW"}
                  styles={"form green manage"}
                  onClick={() => props.onViewCourse(props.id, null, null, "Dashboard")}
                />
              </div>

              {/* Manage Button */}
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

              {/* Unenroll Button */}
              {props.role !== "owner" &&
                <div className="leave-button">
                  <Button
                    text={"UNENROLL"}
                    styles={`form red manage ${isEnrolled ? "" : "disabled"}`}
                    onClick={props.role !== "owner" ? () => toggleConfirmation() : null}
                    disabled={props.role === "owner" || !isEnrolled}
                  />
                </div>
              }

            </div>
          </div>

        </>
      }

      {/* Unenrolment confirmation */}
      {state.showConfirmation &&
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
