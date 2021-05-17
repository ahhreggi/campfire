import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import BackButton from "./BackButton";
import ManageList from "./ManageList";
import "./Manage.scss";

const Manage = (props) => {

  Manage.propTypes = {
    userData: PropTypes.object,
    userCourses: PropTypes.array,
    onLeaveCourse: PropTypes.func,
    onViewCourse: PropTypes.func,
    status: PropTypes.string,
    errors: PropTypes.array,
    onRedirect: PropTypes.func
  };

  const [state, setState] = useState({
    activeCourses: [],
    archivedCourses: []
  });

  // Update categories whenever userCourses changes
  useEffect(() => {

    const activeCourses = [];
    const archivedCourses = [];

    for (const course of props.userCourses) {
      if (course.archived) {
        archivedCourses.push(course);
      } else {
        activeCourses.push(course);
      }
    }

    setState({
      ...state,
      activeCourses: activeCourses,
      archivedCourses: archivedCourses
    });

  }, [props.userCourses]);

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
          You are currently enrolled in <span className={`number active ${state.activeCourses.length === 0 ? "disable" : ""}`}>{state.activeCourses.length}</span> active course{state.activeCourses.length !== 1 ? "s" : ""}
          {state.archivedCourses.length > 0 ? <> and <span className="number archived">{state.archivedCourses.length}</span> archived course{state.archivedCourses.length !== 1 ? "s" : ""}</> : ""}.
        </div>
      </div>

      {/* CourseList */}
      <div className="user-courses">
        {/* Active Courses List */}
        <ManageList
          courses={state.activeCourses}
          onLeaveCourse={props.onLeaveCourse}
          onViewCourse={props.onViewCourse}
          onRedirect={props.onRedirect}
        />
        {/* Archived Courses List */}
        <ManageList
          courses={state.archivedCourses}
          onLeaveCourse={props.onLeaveCourse}
          onViewCourse={props.onViewCourse}
          onRedirect={props.onRedirect}
        />
      </div>


      {/* Back to Home */}
      <BackButton onRedirect={props.onRedirect} />
    </div>
  );
};

export default Manage;
