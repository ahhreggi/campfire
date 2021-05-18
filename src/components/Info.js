import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import Confirmation from "./Confirmation";
import star from "../images/icons/star.png";
import "./Info.scss";
import moment from "moment";

const Info = (props) => {

  Info.propTypes = {
    active: PropTypes.string,
    courseData: PropTypes.object,
    onLeaveCourse: PropTypes.func
  };

  const [state, setState] = useState({
    showConfirmation: false
  });

  // STATE-AFFECTING FUNCTIONS //////////////////////////////////////

  const toggleConfirmation = () => {
    setState({ showConfirmation: !state.showConfirmation });
  };

  const owner = props.courseData.users.filter(user => user.role === "owner")[0];
  const instructors = props.courseData.users
    .filter(user => user.role === "instructor");
  instructors.unshift(owner);
  const instructorElements = instructors.map((instructor, index) => {
    return (
      <div key={instructor.user_id}>
        <img src={`./images/avatars/${instructor.avatar_id}.png`} />
        {instructor.first_name} {instructor.last_name}
        {index === 0 &&
          <>
            <img src={star} className="star" />
            <span>HEAD INSTRUCTOR</span>
          </>
        }
      </div>
    );
  });

  const isEnrolled = props.courseData.join_date;

  return (
    <div className="Info">

      {/* Page Title */}
      <div className="page-title">
        {props.active === "Info" &&
          <>Course information</>
        }

      </div>

      <hr />

      <div className={`course-card ${state.showConfirmation ? "pending" : ""}`}>


        {props.active === "Info" &&
          <div className="course-title">
            {props.courseData.course_code}: {props.courseData.name}
          </div>
        }

        <div className="course-date">
          {moment(props.courseData.created_at).format("MMMM YYYY")}
        </div>

        <div className="course-description">
          {props.courseData.description || "The course instructor has not provided a description for this course."}
        </div>


        {/* Page Text */}
        {props.active === "Info" &&
          <div className="instructors">
            <header>Instructors:</header>
            {instructorElements}
          </div>
        }

        {/* Unenroll Button */}
        {props.active === "Info" && !state.showConfirmation &&
          <div className="unenroll-button">
            <Button
              text={"UNENROLL"}
              styles={`form red manage ${props.courseData.role === "owner" ? "disabled" : ""}`}
              onClick={props.courseData.role !== "owner" ? () => toggleConfirmation() : null}
              disabled={props.courseData.role === "owner" || !isEnrolled}
            />
            {/* Cannot Unenroll Message */}
            {props.active === "Info" && props.courseData.role === "owner" &&
              <div className="unable">You must pass ownership of the course to another user before unenrolling, or delete the course entirely.</div>
            }
          </div>
        }


        {/* Unenrolment confirmation */}
        {state.showConfirmation && props.active === "Info" &&
          <div className="confirmation">
            <hr />
            <Confirmation
              message={`Are you sure you would like to unenroll from ${props.courseData.course_code}?`}
              onConfirm={() => props.onLeaveCourse(props.courseData.id)}
              onCancel={toggleConfirmation}
            />
          </div>
        }

      </div>

      {props.active === "Info" &&
        <hr />
      }

    </div>
  );

};

export default Info;