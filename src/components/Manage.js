import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import BackButton from "./BackButton";
import ManageList from "./ManageList";
import "./Manage.scss";

const Manage = (props) => {

  Manage.propTypes = {
    userData: PropTypes.array,
    userCourses: PropTypes.array,
    onLeaveCourse: PropTypes.func,
    status: PropTypes.string,
    errors: PropTypes.errors,
    onRedirect: PropTypes.func
  };

  // VARIABLES //////////////////////////////////////////////////////

  const activeCourses = [];
  const archivedCourses = [];

  for (const course of props.userCourses) {
    if (course.archived) {
      archivedCourses.push(course);
    } else {
      activeCourses.push(course);
    }
  }

  const numActiveCourses = activeCourses.length;
  const numArchivedCourses = archivedCourses.length;

  ///////////////////////////////////////////////////////////////////

  return (
    <div className="Manage">

      {/* Page Title */}
      <div className="page-title">
        Manage enrolments
      </div>

      <hr />

      {/* Page Text */}
      <div className="page-text">
        <div>
          You may unenrol from a course at any time, however please note that any contributions you&apos;ve made will remain unchanged (you can always delete them manually).
        </div>
        <div className="counters">
          You are currently enrolled in <span className="number active">{numActiveCourses}</span> active course{numActiveCourses !== 1 ? "s" : ""}
          {numArchivedCourses > 0 ? <> and <span className="number archived">{numArchivedCourses}</span> archived course{numArchivedCourses !== 1 ? "s" : ""}.</> : ""}
        </div>
      </div>

      {/* CourseList */}
      <div className="user-courses">
        <ManageList />
        <ManageList />
      </div>


      {/* Back to Home */}
      <BackButton onRedirect={props.onRedirect} />
    </div>
  );
};

export default Manage;
