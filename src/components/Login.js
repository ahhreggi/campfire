import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TextForm from "./EditForm/TextForm";
import Button from "./Button";
import "./Login.scss";

import DevData from "./DevData";

const Login = (props) => {

  Login.propTypes = {
    onSubmit: PropTypes.func,
    errors: PropTypes.array,
    onRedirect: PropTypes.func
  };

  const [state, setState] = useState({
    email: "hello5@campfire.ca", // should be null by default
    password: "campfire", // should be null by default
    errors: props.errors
  });

  useEffect(() => {
    setState({ ...state, errors: props.errors });
  }, [props.errors]);

  const handleInputChange = (event, field) => {
    setState({ ...state, [field]: event.target.value, errors: null });
  };

  const handleSubmit = () => {
    const data = {
      email: state.email,
      password: state.password
    };
    props.onSubmit(data);
  };

  return (
    <div className="Login">

      <DevData name="Login" props={props} />

      {/* Page Title */}
      <div className="page-title">
        Login Page
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
          label={"E-mail"}
          text={state.email}
          onChange={(event) => handleInputChange(event, "email")}
        />

        <TextForm
          label={"Password"}
          text={state.password}
          onChange={(event) => handleInputChange(event, "password")}
        />
      </div>

      {/* Submit Button */}
      <div className="submit">
        <Button
          text="Login"
          styles="submit login"
          onClick={handleSubmit}
        />
      </div>

      {/* Register Button */}
      <div className="register-link">
        <Button
          text="Go to Register"
          onClick={() => props.onRedirect("Register")}
        />
      </div>



    </div>
  );
};

export default Login;
