import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CourseListItem from "./CourseListItem";
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
    showCourses: true
  });

  // VARIABLES //////////////////////////////////////////////////////

  // Sort the courses from most recent to oldest
  const userCourses = props.userCourses.sort((a, b) => {
    return a.id - b.id;
  });

  const courses = userCourses.map(course => {
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

  const toggleCourses = () => {
    setState({ ...state, showCourses: !state.showCourses });
  };

  return (
    <div className="CourseList">

      <div
        className={`courses-label ${state.showCourses ? "active" : ""} ${props.userCourses.length < 1 ? "empty" : ""}`}
        onClick={() => toggleCourses()}
      >
        <div>
          <img className="books" src={books} />
          MY COURSES
        </div>
        <div className="arrows">
          <img src={state.showCourses ? up : down} />
        </div>
      </div>

      {state.showCourses && courses.length > 0 &&
          <div>{courses}</div>
      }

      {state.showCourses && !courses.length &&
        <div>You aren&apos;t enrolled in any courses yet!</div>
      }

    </div>
  );
};

export default CourseList;
