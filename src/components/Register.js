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

  const handleSubmit = () => {
    // Check that the password and passwordConf are the same
    if (state.password === state.passwordConf) {
      const data = {
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        password: state.password
      };
      props.onSubmit(data);
    } else {
      setState({ ...state, errors: ["Passwords do not match!"] });
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
