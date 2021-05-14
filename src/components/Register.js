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

  useEffect(() => {
    setState({ ...state, errors: props.errors });
  }, [props.errors]);

  const handleInputChange = (event, field) => {
    setState({ ...state, [field]: event.target.value, errors: null });
  };

  const isValidLength = (string, limit = 250) => {
    const length = string.trim().length;
    return length > 0 && length <= limit;
  };

  const isValidName = (string) => {
    return /^[a-zA-Z\s]+$/.test(string.trim());
  };

  const isValidEmail = (string) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(string.trim());
  };

  const handleSubmit = () => {
    // Check that the fields are valid!
    const errors = [];

    // 1: No fields may be empty
    if (!state.firstName || !state.lastName || !state.email || !state.password || !state.passwordConf) {
      errors.push("Please complete all fields!");
    // 2: Password and passwordConf must be the same
    } else if (state.password !== state.passwordConf) {
      errors.push("Passwords do not match!");
      // 3: Fields must be 1-250 characters
    } else if (!isValidLength(state.firstName)) {
      errors.push("First name is too long!");
    } else if (!isValidLength(state.lastName)) {
      errors.push("First name is too long!");
    } else if (!isValidLength(state.email)) {
      errors.push("Email is too long!");
    } else if (!isValidLength(state.password)) {
      errors.push("Password is too long!");

      // Check for invalid characters in the name
    } else if (!isValidName(state.firstName) || !isValidName(state.lastName)) {
      errors.push("First and last name may only include letters and spaces.");

      // Check for invalid email format
    } else if (!isValidEmail(state.email)) {
      errors.push("Please enter a valid email");
    }

    // If there are any errors, display them to the user
    if (errors.length) {
      setState({ ...state, errors: errors });

      // Otherwise, sanitize the data and submit the form
    } else {
      const data = {
        firstName: state.firstName.trim(),
        lastName: state.lastName.trim(),
        email: state.email.trim().toLowerCase(),
        password: state.password // keep password as is
      };
      props.onSubmit(data);
    }
  };

  return (
    <div className="Register">

      <DevData name="Register" data={props} />

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
