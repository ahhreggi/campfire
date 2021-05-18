import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import BackButton from "./BackButton";
import "./Join.scss";

const Join = (props) => {

  Join.propTypes = {
    onSubmit: PropTypes.func,
    status: PropTypes.string,
    statusMessage: PropTypes.string,
    errors: PropTypes.array,
    onRedirect: PropTypes.func
  };

  const [state, setState] = useState({
    accessCode: "",
    status: props.status,
    statusMessage: props.status,
    errors: props.errors
  });

  useEffect(() => {
    setState({ ...state, status: props.status, statusMessage: props.statusMessage });
  }, [props.status, props.statusMessage]);

  useEffect(() => {
    setState({ ...state, errors: props.errors });
  }, [props.errors]);

  // STATE-AFFECTING FUNCTIONS //////////////////////////////////////

  const handleInputChange = (event, field) => {
    setState({ ...state, [field]: event.target.value, errors: null });
  };

  // Validate input field prior to submitting the data
  const handleSubmit = () => {
    const errors = [];
    if (!state.accessCode) {
      errors.push("Please enter a valid access code");
    }
    // If there are any errors, display them to the user, otherwise sanitize and submit
    if (errors.length) {
      setState({ ...state, errors: errors });
    } else {
      const data = {
        accessCode: state.accessCode.trim()
      };
      props.onSubmit(data);
    }
  };

  ///////////////////////////////////////////////////////////////////

  return (
    <div className="Join">

      {/* Page Title */}
      <div className="page-title">
        Join an existing course
      </div>

      <hr />

      {/* Page Text */}
      <div className="page-text">
        Have a <span className="student">student</span> or <span className="instructor">instructor</span> access code? Enter it below to enrol. If you&apos;re unsure or don&apos;t have a code yet, contact your head instructor.
      </div>

      <div className={`panel ${state.status} ${state.errors ? "invalid" : ""}`}>

        {/* Form Fields */}
        <div className="form-fields">
          {/* Label */}
          <div className="form-label">
            Course Access Code
          </div>
          <input
            value={state.accessCode}
            onChange={(event) => handleInputChange(event, "accessCode")}
            placeholder={"7b8257fb-126e-4a3f-961b-81891c6edf4a"}
            maxLength={36}
          />
        </div>

        {/* Success/Errors */}
        <div>
          <div className={`messages ${state.status} ${state.errors ? "error" : ""}`}>
            {state.status && state.statusMessage ? <>Joining&nbsp;<span className="course-name">{state.statusMessage}...</span></> : null}
            {state.errors && state.errors.join("")}
          </div>
        </div>

        {/* Submit Button */}
        <div className="submit">
          <Button
            text="SUBMIT"
            styles="form green"
            onClick={handleSubmit}
            disabled={state.status === "success"}
          />
        </div>

      </div>

      <hr />

    </div>
  );
};

export default Join;
