import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import BackButton from "./BackButton";
import "./Manage.scss";

const Manage = (props) => {

  Manage.propTypes = {
    active: PropTypes.func,
    userCourses: PropTypes.array,
    onRedirect: PropTypes.func
  };

  return (
    <div className="Manage">

    </div>
  );
};

export default Manage;
