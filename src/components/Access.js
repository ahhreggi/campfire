import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import "./Access.scss";

const Access = (props) => {

  Access.propTypes = {
    studentCode: PropTypes.string,
    instructorCode: PropTypes.string,
    onResetAccess: PropTypes.func,
    isOwner: PropTypes.bool
  };

  const [state, setState] = useState({
    showStudentCode: false,
    showInstructorCode: false,
    copiedStudentCode: false,
    copiedInstructorCode: false,
    resetCode: false
  });

  const resetCode = () => {
    if (props.isOwner) {
      props.onResetAccess();
      if (!state.resetCode) {
        setState({ ...state, resetCode: true });
        setTimeout(() => {
          setState({ ...state, resetCode: false });
        }, 1500);
      }
    }
  };

  const copyStudentCode = (text) => {
    navigator.clipboard.writeText(text);
    if (!state.copiedStudentCode) {
      setState({ ...state, copiedStudentCode: true });
      setTimeout(() => {
        setState({ ...state, copiedStudentCode: false });
      }, 1500);
    }
  };

  const copyInstructorCode = (text) => {
    navigator.clipboard.writeText(text);
    if (!state.copiedInstructorCode) {
      setState({ ...state, copiedInstructorCode: true });
      setTimeout(() => {
        setState({ ...state, copiedInstructorCode: false });
      }, 1500);
    }
  };

  return (
    <div className="Access">

      <div className="page-title">
        <header>Course access codes</header>
      </div>

      <hr />

      <div className="page-text">
        Invite <span>students</span> and <span className="instructor">instructors</span> to join this discussion board by providing them with the appropriate access codes below.
      </div>

      <div className="code">
        <header>Student access code</header>
        <div className="box">
          <input
            value={props.studentCode}
            readOnly
            onClick={() => copyStudentCode(props.studentCode)}
          />
        </div>
        <div
          className={`msg ${state.copiedStudentCode ? "" : "active"}`}
          onClick={!state.copiedStudentCode ? () => copyStudentCode(props.studentCode) : null}
        >
          {state.copiedStudentCode ? "COPIED TO CLIPBOARD!" : "CLICK TO COPY"}
        </div>
      </div>

      <div className="code instructor">
        <span>Instructor access code</span>
        <div className="box">
          <input
            value={props.instructorCode}
            readOnly
            onClick={() => copyInstructorCode(props.instructorCode)}
          />
        </div>
        <div
          className={`msg instructor ${state.copiedInstructorCode ? "" : "active"}`}
          onClick={!state.copiedInstructorCode ? () => copyInstructorCode(props.instructorCode) : null}
        >
          {state.copiedInstructorCode ? "COPIED TO CLIPBOARD!" : "CLICK TO COPY"}
        </div>
      </div>

      <hr />

      <div className="center">

        {props.isOwner &&
          <Button
            text={state.resetCode ? "DONE!" : "RESET CODES"}
            styles={`form reset ${state.resetCode ? "green" : "red"}`}
            onClick={() => resetCode()}
          />
        }

      </div>

    </div>
  );
};

export default Access;