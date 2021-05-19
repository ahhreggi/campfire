import { useState } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import "./Access.scss";

const Access = (props) => {

  Access.propTypes = {
    courseID: PropTypes.number,
    studentCode: PropTypes.string,
    instructorCode: PropTypes.string,
    onResetAccess: PropTypes.func,
    isOwner: PropTypes.bool
  };

  const [copiedStudent, setCopiedStudent] = useState(false);
  const [copiedInstructor, setCopiedInstructor] = useState(false);

  const resetCode = () => {
    if (props.isOwner) {
      props.onResetAccess(props.courseID);
    }
  };

  const copyStudentCode = (text) => {
    navigator.clipboard.writeText(text);
    if (!copiedStudent) {
      setCopiedStudent(true);
      setTimeout(() => {
        setCopiedStudent(false);
      }, 1500);
    }
  };

  const copyInstructorCode = (text) => {
    navigator.clipboard.writeText(text);
    if (!copiedInstructor) {
      setCopiedInstructor(true);
      setTimeout(() => {
        setCopiedInstructor(false);
      }, 1500);
    }
  };

  return (
    <div className="Access">

      {/* Page Title */}
      <div className="page-title">
        <header>Course access codes</header>
      </div>

      <hr />

      {/* Page Text */}
      <div className="page-text">
        Invite <span>students</span> and <span className="instructor">instructors</span> to join this discussion board by providing them with the appropriate access codes below.
      </div>

      {/* Student Access Code */}
      <div className="code">
        <header>Student access code</header>
        <div className="box">
          <input
            value={props.studentCode}
            readOnly
            onClick={() => copyStudentCode(props.studentCode)}
          />
        </div>
        {/* Click to Copy Button */}
        <div
          className={`msg ${copiedStudent ? "" : "active"}`}
          onClick={!copiedStudent ? () => copyStudentCode(props.studentCode) : null}
        >
          {copiedStudent ? "COPIED TO CLIPBOARD!" : "CLICK TO COPY"}
        </div>
      </div>

      {/* Instructor Access Code */}
      <div className="code instructor">
        <span>Instructor access code</span>
        <div className="box">
          <input
            value={props.instructorCode}
            readOnly
            onClick={() => copyInstructorCode(props.instructorCode)}
          />
        </div>
        {/* Click to Copy Button */}
        <div
          className={`msg instructor ${copiedInstructor ? "" : "active"}`}
          onClick={!copiedInstructor ? () => copyInstructorCode(props.instructorCode) : null}
        >
          {copiedInstructor ? "COPIED TO CLIPBOARD!" : "CLICK TO COPY"}
        </div>
      </div>

      <hr />

      {/* Reset Button */}
      <div className="center">

        {props.isOwner &&
          <Button
            text="RESET CODES"
            styles="form reset red"
            onClick={() => resetCode()}
          />
        }

      </div>

    </div>
  );
};

export default Access;