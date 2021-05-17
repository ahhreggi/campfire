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
    archivedCourses: [],
    showActiveCourses: true,
    showArchivedCourses: false
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

  const showCategory = (category) => {
    if (category === "active") {
      setState({ ...state, showActiveCourses: true, showArchivedCourses: false });
    } else {
      setState({ ...state, showActiveCourses: false, showArchivedCourses: true });
    }
  };

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

      <div className="tabs">
        <Button
          text="Active Courses"
          styles={`tab ${state.showActiveCourses ? "active" : ""}`}
          onClick={() => showCategory("active")}
        />
        <Button
          text="Archived Courses"
          styles={`tab ${state.showArchivedCourses ? "active" : ""}`}
          onClick={() => showCategory("archived")}
        />
      </div>

      {/* CourseList */}
      <div className="user-courses">
        {/* Active Courses List */}
        {state.showActiveCourses &&
          <>
            {state.activeCourses.length > 0 &&
              <ManageList
                courses={state.activeCourses}
                onLeaveCourse={props.onLeaveCourse}
                onViewCourse={props.onViewCourse}
                onRedirect={props.onRedirect}
              />
            }
            {state.activeCourses.length === 0 &&
              <div className="empty">You aren&apos;t enrolled in any courses yet!</div>
            }
          </>
        }
        {/* Archived Courses List */}
        {state.showArchivedCourses &&
          <>
            {state.archivedCourses.length > 0 &&
              <ManageList
                courses={state.archivedCourses}
                onLeaveCourse={props.onLeaveCourse}
                onViewCourse={props.onViewCourse}
                onRedirect={props.onRedirect}
              />
            }
            {state.archivedCourses.length === 0 &&
              <div className="empty">You have no archived courses.</div>
            }
          </>
        }
      </div>


      {/* Back to Home */}
      <BackButton onRedirect={props.onRedirect} />
    </div>
  );
};

export default Manage;