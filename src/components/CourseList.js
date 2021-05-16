import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CourseListItem from "./CourseListItem";
import archive from "../images/icons/archive.png";
import books from "../images/icons/courses.png";
import up from "../images/icons/up-arrow.png";
import down from "../images/icons/down-arrow.png";
import "./CourseList.scss";

const CourseList = (props) => {
  CourseList.propTypes = {
    active: PropTypes.string,
    userCourses: PropTypes.array,
    onClick: PropTypes.func
  };

  const [state, setState] = useState({
    showCourses: true,
    showArchived: false,
  });

  // STATE-AFFECTING FUNCTIONS //////////////////////////////////////

  // Show/hide the active courses list
  const toggleCourses = () => {
    setState({ ...state, showCourses: !state.showCourses });
  };

  // Show/hide the archived courses list
  const toggleArchived = () => {
    setState({ ...state, showArchived: !state.showArchived });
  };

  // HELPER FUNCTIONS ///////////////////////////////////////////////

  // Create CourseListItem components using the given array of courses
  const getCourseListItems = (courses) => {
    return courses.map(course => {
      return (
        <CourseListItem
          key={course.id}
          id={course.id}
          name={course.name}
          code={course.course_code}
          createdAt={course.created_at}
          archived={course.archived}
          role={course.role}
          unresolved={course.unresolved > 0}
          onClick={props.onClick}
        />
      );
    });
  };

  // VARIABLES //////////////////////////////////////////////////////

  // Sort the courses from most recent to oldest
  const userCourses = props.userCourses.sort((a, b) => {
    return a.id - b.id;
  });

  const courses = {
    active: [],
    archived: []
  };

  for (const course of userCourses) {
    if (course.archived) {
      courses.archived.push(course);
    } else {
      courses.active.push(course);
    }
  }

  const activeCourses = getCourseListItems(courses.active);
  const archivedCourses = getCourseListItems(courses.archived);

  ///////////////////////////////////////////////////////////////////

  return (
    <div className="CourseList">

      {/* Active Courses List */}
      <div
        className={`courses-label ${state.showCourses ? "active" : ""} ${activeCourses.length < 1 ? "empty" : ""}`}
        onClick={activeCourses.length > 0 ? () => toggleCourses() : null}
      >
        <div>
          <img className="books" src={books} />
          MY COURSES
        </div>
        <div className="arrows">
          <img src={state.showCourses ? up : down} />
        </div>
      </div>

      {state.showCourses && activeCourses.length > 0 &&
          <div>{activeCourses}</div>
      }

      {state.showCourses && !activeCourses.length &&
        <div className="empty msg">You aren&apos;t enrolled in any courses yet!</div>
      }

      {/* Archived Courses List */}
      <div
        className={`courses-label ${state.showArchived ? "active" : ""} ${archivedCourses.length < 1 ? "empty" : ""}`}
        onClick={archivedCourses.length > 0 ? () => toggleArchived() : null}
      >
        <div>
          <img className="books" src={archive} />
          ARCHIVED COURSES
        </div>
        <div className="arrows">
          <img src={state.showArchived ? up : down} />
        </div>
      </div>

      {state.showArchived && archivedCourses.length > 0 &&
          <div>{archivedCourses}</div>
      }

      {state.showArchived && !archivedCourses.length &&
        <div className="empty-msg">You have no archived courses</div>
      }

    </div>
  );
};

export default CourseList;
