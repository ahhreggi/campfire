import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import "./Access.scss";

const Access = (props) => {

  Access.propTypes = {
    studentCode: PropTypes.string,
    instructorCode: PropTypes.string,
    onResetAccess: PropTypes.func
  };

  const [state, setState] = useState({
    showStudentCode: false,
    showInstructorCode: false,
    copiedStudentCode: false,
    copiedInstructorCode: false
  });

  useEffect(() => {
    if (state.copiedStudentCode) {
      setTimeout(() => {
        setState({ ...state, copiedStudentCode: false});
      }, 2000);
    }
  }, [state.copiedStudentCode]);

  useEffect(() => {
    if (state.copiedInstructorCode) {
      setTimeout(() => {
        setState({ ...state, copiedInstructorCode: false});
      }, 2000);
    }
  }, [state.copiedInstructorCode]);

  const copyStudentCode = (text) => {
    setState({ ...state, copiedStudentCode: true });
  };

  const copyInstructorCode = (text) => {
    setState({ ...state, copiedInstructorCode: true });
  };

  return (
    <div className="Access">

      <div className="page-title">
        Course access codes
      </div>

      <hr />

      <div className="code">
        Student access code:
        <input
          value={props.studentCode}
          readOnly
        />
        <Button
          text={state.copiedStudentCode ? "COPIED!" : "COPY"}
          styles="form cancel"
          onClick={() => copyStudentCode(props.studentCode)}
        />
      </div>

      <div className="code instructor">
        Instructor access code:
        <input
          value={props.instructorCode}
          readOnly
        />
        <Button
          text={state.copiedInstructorCode ? "COPIED!" : "COPY"}
          styles="form yellow"
          onClick={() => copyInstructorCode(props.instructorCode)}
        />
      </div>



    </div>
  );
};

export default Access;