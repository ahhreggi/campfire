import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TextForm from "./EditForm/TextForm";
import Button from "./Button";
import "./Join.scss";

import DevData from "./DevData";

const Join = (props) => {

  Join.propTypes = {
    userData: PropTypes.object,
    onSubmit: PropTypes.func,
    errors: PropTypes.array,
    onRedirect: PropTypes.func
  };

  const [state, setState] = useState({
    accessCode: "",
    errors: props.errors
  });

  useEffect(() => {
    setState({ ...state, errors: props.errors });
  }, [props.errors]);

  const handleInputChange = (event, field) => {
    setState({ ...state, [field]: event.target.value, errors: null });
  };

  // Check if a code contains only letters and numbers
  const isValidAccessCode = (code) => {
    return !!(code).match("^[a-zA-Z0-9]+$");
  };

  // Validate input field prior to submitting the data
  const handleSubmit = () => {
    // TODO: Set specific parameters for an access code?
    // E.g., X number of digits, numbers and letters only, etc...

    const errors = [];
    if (!state.accessCode || !isValidAccessCode(state.accessCode)) {
      errors.push("Please enter a valid access code.");
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
        Join Page
      </div>

      {/* Errors */}
      {state.errors && state.errors.length > 0 &&
        <div className="errors">
          {state.errors.join("")}
        </div>
      }

      {/* Form Fields */}
      <div className="form-fields">
        <TextForm
          label={"Course Access Code"}
          text={state.accessCode}
          onChange={(event) => handleInputChange(event, "accessCode")}
        />

      </div>

      {/* Submit Button */}
      <div className="submit">
        <Button
          text="Join"
          styles="submit join"
          onClick={handleSubmit}
        />
      </div>

      {/* Create Button */}
      <div className="create-link">
        <Button
          text="Go to Create"
          onClick={() => props.onRedirect("Create")}
        />
      </div>

      {/* Home Button */}
      <div className="home-link">
        <Button
          text="Go to Home"
          onClick={() => props.onRedirect("Home")}
        />
      </div>

    </div>
  );
};

export default Join;
