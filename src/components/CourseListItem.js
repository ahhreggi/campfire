import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./CourseListItem.scss";

const CourseListItem = (props) => {
  CourseListItem.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    createdAt: PropTypes.string,
    archived: PropTypes.bool,
    role: PropTypes.string,
    onClick: PropTypes.func
  };

  const selectCourse = (courseID) => {
    props.onClick(courseID);
  };
  return (
    <div
      className="CourseListItem"
      onClick={() => selectCourse(props.id)}
    >
      <div>id: {props.id}</div>
      <div>name: {props.name}</div>
      <div>createdAt: {props.createdAt}</div>
      <div>archived: {props.archived}</div>
      <div>role: {props.role}</div>
    </div>
  );
};

export default CourseListItem;
