import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TextForm from "./EditForm/TextForm";
import Button from "./Button";
import BackButton from "./BackButton";
import "./Join.scss";

import DevData from "./DevData";

const Join = (props) => {

  Join.propTypes = {
    userData: PropTypes.object,
    onSubmit: PropTypes.func,
    status: PropTypes.string,
    errors: PropTypes.array,
    onRedirect: PropTypes.func
  };

  const [state, setState] = useState({
    accessCode: "",
    status: props.status,
    errors: props.errors
  });

  useEffect(() => {
    setState({ ...state, status: props.status });
  }, [props.status]);

  useEffect(() => {
    setState({ ...state, errors: props.errors });
  }, [props.errors]);

  const handleInputChange = (event, field) => {
    setState({ ...state, [field]: event.target.value, errors: null });
  };

  // Check if a code contains only letters and numbers?
  const isValidAccessCode = (code) => {
    return true || code;
    // return !!(code).match("^[a-zA-Z0-9]+$");
  };

  // Validate input field prior to submitting the data
  const handleSubmit = () => {
    // TODO: Set specific parameters for an access code?
    // E.g., X number of digits, numbers and letters only, etc...

    const errors = [];
    if (!state.accessCode || !isValidAccessCode(state.accessCode)) {
      errors.push("Please enter a valid 36-character access code");
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

  return (
    <div className="Join">

      <DevData name="Join" props={props} />

      {/* Page Title */}
      <div className="page-title">
        Join an existing course
      </div>

      <hr />

      {/* Page Text */}
      <div className="page-text">
        Have a <span className="student">student</span> or <span className="instructor">instructor</span> access code? Enter it below to enrol in the course. If you&apos;re unsure or don&apos;t have a code yet, contact your head instructor.
      </div>

      <div className={`panel ${state.status} ${state.errors ? "invalid" : ""}`}>

        {/* Form Fields */}
        <div className="form-fields">
          {/* Label */}
          <div className="form-label">
            Course Access Code
          </div>
          <input
            text={state.accessCode}
            onChange={(event) => handleInputChange(event, "accessCode")}
            placeholder={"7b8257fb-126e-4a3f-961b-81891c6edf4a"}
            maxLength={36}
          />
        </div>

        {/* Errors */}
        <div>
          <div className={`messages ${state.status} ${state.errors ? "error" : ""}`}>
            {state.status && "Course found!"}
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

      {/* Back to Home */}
      <BackButton onRedirect={props.onRedirect} />

    </div>
  );
};

export default Join;
