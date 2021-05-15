import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CourseListItem from "./CourseListItem";
import "./CourseList.scss";

const CourseList = (props) => {
  CourseList.propTypes = {
    active: PropTypes.string,
    userCourses: PropTypes.array,
    onClick: PropTypes.func
  };
  const courses = props.userCourses.map(course => {
    return (
      <CourseListItem
        key={course.id}
        id={course.id}
        name={course.name}
        createdAt={course.created_at}
        archived={course.archived}
        role={course.role}
        onClick={props.onClick}
      />
    );
  });
  return (
    <div className="CourseList">
      {courses}
    </div>
  );
};

export default CourseList;
