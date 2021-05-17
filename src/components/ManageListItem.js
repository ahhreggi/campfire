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

  const toggleConfirmation = () => {
    setState({ showConfirmation: !state.showConfirmation });
  };

  // Convert timestamp into a readable format
  // TODO: Move to helper file
  const formatTimestamp = (timestamp, relative) => {
    if (relative) {
      return moment(timestamp).subtract(3, "seconds").fromNow();
    } else {
      return moment(timestamp).subtract(3, "seconds").format("dddd, MMMM Do, YYYY @ h:mm a");
    }
  };

  const isEnrolled = props.joinDate;

  const joinedString = isEnrolled ? moment(props.joinDate).format("YYYY/MM/DD") : "UNENROLLED";

  return (
    <div className={`ManageListItem ${state.showConfirmation ? "center" : ""} ${props.role}`}>
      {!state.showConfirmation &&
        <>
          <div className="left">
            <div className={`role ${props.role}`}>
              {props.role === "owner" ? "owner (instructor)" : props.role}
              <span className="joined">
                {joinedString}
              </span>
            </div>
            <div className={`code ${props.archived ? "archived" : ""}`}>
              {props.courseCode}
            </div>
            <div className="name text-truncate">
              {props.name}
            </div>
          </div>

          <div className="right">
            <div className="buttons">
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
