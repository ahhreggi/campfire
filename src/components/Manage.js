import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import BackButton from "./BackButton";
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

  return (
    <div className="Manage">

    </div>
  );
};

export default Manage;
