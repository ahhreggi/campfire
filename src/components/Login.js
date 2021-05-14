import { useState } from "react";
import PropTypes from "prop-types";
import TextForm from "./EditForm/TextForm";
import Button from "./Button";
import "./Login.scss";

import DevData from "./DevData";

const Login = (props) => {

  Login.propTypes = {
    onSubmit: PropTypes.func
  };

  const [state, setState] = useState({
    email: "hello1@campfire.ca",
    password: "campfire"
  });

  const handleInputChange = (event, field) => {
    setState({ ...state, [field]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { ...state };
    props.onSubmit(data);

  };

  return (
    <div className="Login">

      <DevData name="Login" props={props} />

      {/* Page Title */}
      <div className="page-title">
        Login Page
      </div>

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

      {/* TEST */}
      {/* <Link to="/register">Register</Link> */}

    </div>
  );
};

export default Login;
