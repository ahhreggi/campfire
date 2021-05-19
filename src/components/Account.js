import { useState } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import "./Account.scss";

const Account = (props) => {

  Account.propTypes = {
    userData: PropTypes.object,
    onSubmit: PropTypes.func,
    errors: PropTypes.array,
    onRedirect: PropTypes.func
  };

  const [state, setState] = useState({
    firstName: props.userData.firstName,
    lastName: props.userData.lastName,
    email: props.userData.email,
    password: "",
    passwordConf: "",
    errors: props.errors
  });

  // STATE HANDLERS /////////////////////////////////////////////////

  // 20 20 100 100
  const handleInputChange = (event, field, maxLength = 250) => {
    if (event.target.value.length <= maxLength) {
      setState({ ...state, [field]: event.target.value, errors: null });
    } else {
      setState({ ...state, errors: [`Reached maximum character length (${maxLength})`]});
    }
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

  // Validate form fields prior to submitting the data
  const handleSubmit = () => {
    const errors = [];
    if (!state.firstName || !state.lastName || !state.email || !state.password || !state.passwordConf) {
      errors.push("Incomplete fields");
    } else if (!isValid(state.firstName, "name") || !isValid(state.lastName, "name")) {
      errors.push("Name may include letters and spaces only");
    } else if (state.password !== state.passwordConf) {
      errors.push("Passwords must match");
    } else if (!isValid(state.email, "email")) {
      errors.push("Invalid email");
    } else if (!isValid(state.firstName, "length", 20)) {
      errors.push("First name is too long (max. 20 characters)");
    } else if (!isValid(state.lastName, "length", 20)) {
      errors.push("Last name is too long (max. 20 characters)");
    } else if (!isValid(state.email, "length", 250)) {
      errors.push("Email is too long (max. 100 characters)");
    } else if (!isValid(state.password, "length", 250)) {
      errors.push("Password is too long (max. 100 characters)");
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

  return (
    <div className="Account">

      {/* Page Title */}
      <div className="page-title">
        <header>Account settings</header>
      </div>

      <hr />

      <div className="form-fields">

        <div className="form-label">
          First Name
        </div>
        <input
          value={state.firstName}
          placeholder={"First Name"}
          onChange={(event) => handleInputChange(event, "firstName", 20)}
        />

        <div className="form-label">
          Last Name
        </div>
        <input
          value={state.lastName}
          placeholder={"Last Name"}
          onChange={(event) => handleInputChange(event, "lastName", 20)}
        />

        <div className="form-label">
          Email
        </div>
        <input
          value={state.email}
          placeholder={"Email"}
          onChange={(event) => handleInputChange(event, "email", 80)}
        />

        <div className="form-label">
          Password
        </div>
        <input
          value={state.password}
          placeholder={"Password"}
          type="password"
          onChange={(event) => handleInputChange(event, "password", 250)}
        />

        <div className="form-label">
          Confirm Password
        </div>
        <input
          value={state.passwordConf}
          placeholder={"Confirm Password"}
          type="password"
          onChange={(event) => handleInputChange(event, "passwordConf", 250)}
        />

        {/* Errors */}
        <div className="errors">
          {state.errors && state.errors.join("")}
        </div>

        {/* Submit */}
        <div className="submit">
          <Button
            text="SAVE"
            styles="form green"
            onClick={handleSubmit}
          />
        </div>

      </div>

    </div>
  );
};

export default Account;
