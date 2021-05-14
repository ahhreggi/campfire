import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TextForm from "./EditForm/TextForm";
import Button from "./Button";
import "./Register.scss";

import DevData from "./DevData";

const Register = (props) => {

  Register.propTypes = {
    onSubmit: PropTypes.func,
    errors: PropTypes.array,
    onRedirect: PropTypes.func
  };

  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConf: "",
    errors: props.errors
  });

  // SIDE EFFECTS ///////////////////////////////////////////////////

  useEffect(() => {
    setState({ ...state, errors: props.errors });
  }, [props.errors]);

  // STATE HANDLERS /////////////////////////////////////////////////

  const handleInputChange = (event, field) => {
    setState({ ...state, [field]: event.target.value, errors: null });
  };

  // HELPER FUNCTIONS ///////////////////////////////////////////////

  // Check if a string is valid for the given field
  const isValid = (string, field, limit = 250) => {
    if (field === "length") {
      const length = string.trim().length;
      return length > 0 && length <= limit;
    } else if (field === "name") {
      return !!(string.match("^[\\sa-zA-Z'-]*$"));
    } else if (field === "email") {
      const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(string.trim());
    }
  };

  // REQUEST HANDLERS ///////////////////////////////////////////////

  // Validate registration fields prior to submitting the data
  const handleSubmit = () => {
    const errors = [];
    if (!state.firstName || !state.lastName || !state.email || !state.password || !state.passwordConf) {
      errors.push("Please complete all fields!");
    } else if (state.password !== state.passwordConf) {
      errors.push("Passwords do not match!");
    } else if (!isValid(state.firstName, "length")) {
      errors.push("First name is too long!");
    } else if (!isValid(state.lastName, "length")) {
      errors.push("Last name is too long!");
    } else if (!isValid(state.email, "length")) {
      errors.push("Email is too long!");
    } else if (!isValid(state.password, "length")) {
      errors.push("Password is too long!");
    } else if (!isValid(state.firstName, "name") || !isValid(state.lastName, "name")) {
      errors.push("First and last name may only include letters and spaces.");
    } else if (!isValid(state.email, "email")) {
      errors.push("Please enter a valid email");
    }
    // If there are any errors, display them to the user, otherwise sanitize and submit
    if (errors.length) {
      setState({ ...state, errors: errors });
    } else {
      const data = {
        firstName: state.firstName.trim(),
        lastName: state.lastName.trim(),
        email: state.email.trim().toLowerCase(),
        password: state.password
      };
      props.onSubmit(data);
    }
  };

  ///////////////////////////////////////////////////////////////////

  return (
    <div className="Register">

      <DevData name="Register" props={props} />

      {/* Page Title */}
      <div className="page-title">
        Register Page
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
          label={"First Name"}
          text={state.firstName}
          onChange={(event) => handleInputChange(event, "firstName")}
        />

        <TextForm
          label={"Last Name"}
          text={state.lastName}
          onChange={(event) => handleInputChange(event, "lastName")}
        />

        <TextForm
          label={"E-mail"}
          text={state.email}
          onChange={(event) => handleInputChange(event, "email")}
        />

        <TextForm
          label={"Password"}
          text={state.password}
          onChange={(event) => handleInputChange(event, "password")}
        />

        <TextForm
          label={"Confirm Password"}
          text={state.passwordConf}
          onChange={(event) => handleInputChange(event, "passwordConf")}
        />
      </div>

      {/* Submit Button */}
      <div className="submit">
        <Button
          text="Register"
          styles="submit register"
          onClick={handleSubmit}
        />
      </div>

      {/* Login Button */}
      <div className="login-link">
        <Button
          text="Go to Login"
          onClick={() => props.onRedirect("Login")}
        />
      </div>

    </div>
  );
};

export default Register;
