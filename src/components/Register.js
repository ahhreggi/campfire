import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import InputField from "./InputField";
import Button from "./Button";
import "./Register.scss";

// import DevData from "./DevData";

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
      errors.push("Incomplete fields");
    } else if (!isValid(state.firstName, "name") || !isValid(state.lastName, "name")) {
      errors.push("Name may include letters & spaces only");
    } else if (state.password !== state.passwordConf) {
      errors.push("Passwords must match");
    } else if (!isValid(state.email, "email")) {
      errors.push("Invalid email");
    } else if (!isValid(state.firstName, "length")) {
      errors.push("First name is too long");
    } else if (!isValid(state.lastName, "length")) {
      errors.push("Last name is too long");
    } else if (!isValid(state.email, "length")) {
      errors.push("Email is too long");
    } else if (!isValid(state.password, "length")) {
      errors.push("Password is too long");
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

      {/* <DevData name="Register" props={props} /> */}

      <div className="panel">

        {/* Campfire */}
        <a
          className="header"
          href="https://github.com/ahhreggi/campfire"
          target="_blank"
          rel="noreferrer"
        >
          <div className="page-title">
            Campfire
            <img className="glow" src="./images/campfire.png" alt="Campfire" />
          </div>
        </a>

        <form>

          {/* Input Fields */}
          <InputField
            value={state.firstName}
            placeholder={"First Name"}
            onChange={(event) => handleInputChange(event, "firstName")}
          />
          <InputField
            value={state.lastName}
            placeholder={"Last Name"}
            onChange={(event) => handleInputChange(event, "lastName")}
          />
          <InputField
            value={state.email}
            placeholder={"Email"}
            onChange={(event) => handleInputChange(event, "email")}
          />
          <InputField
            value={state.password}
            placeholder={"Password"}
            type="password"
            onChange={(event) => handleInputChange(event, "password")}
          />
          <InputField
            value={state.passwordConf}
            placeholder={"Confirm Password"}
            type="password"
            onChange={(event) => handleInputChange(event, "passwordConf")}
          />

          {/* Errors */}
          <div className="errors">
            {state.errors && state.errors.join("")}
          </div>

          {/* Submit */}
          <div className="submit">
            <Button
              type="submit"
              text="Sign Up"
              onClick={handleSubmit}
            />
          </div>

        </form>

        {/* Links */}
        <div className="links">
          <div className="login">
            <div>
              Already have an account?
              <span onClick={() => props.onRedirect("Login")}>
                LOGIN
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Register;
