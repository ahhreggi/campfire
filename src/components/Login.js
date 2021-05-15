import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import InputField from "./InputField";
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
    email: "",
    password: "",
    errors: props.errors
  });

  useEffect(() => {
    setState({ ...state, errors: props.errors });
  }, [props.errors]);

  const handleInputChange = (event, field) => {
    console.log("hey");
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

      <div className="panel">
        {/* Campfire */}
        <div className="page-title">
          Campfire
          <img className="glow" src="./images/campfire.png" alt="Campfire" />
        </div>

        <form>

          {/* Email */}
          <InputField
            value={state.email}
            placeholder={"hello@campfire.ca"}
            onChange={(event) => handleInputChange(event, "email")}
          />

          {/* Password */}
          <InputField
            value={state.password}
            placeholder={"********"}
            type="password"
            onChange={(event) => handleInputChange(event, "password")}
          />

          {/* Errors */}

          <div className="errors">
            {state.errors && state.errors.join("")}
          </div>

          {/* <div className="errors">
            Invalid username/password
          </div> */}

          {/* Submit */}
          <div className="submit">
            <Button
              type="submit"
              text="Login"
              onClick={handleSubmit}
            />
          </div>

        </form>

        {/* Links */}
        <div className="links">
          <div className="register">
            <div>
              New to Campfire?
              <span onClick={() => props.onRedirect("Register")}>
                SIGN UP
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      {/* <div className="form-fields">

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
      </div> */}

      {/* Submit Button */}
      {/* <div className="submit">
        <Button
          text="Login"
          styles="submit login"
          onClick={handleSubmit}
        />
      </div> */}

      {/* Register Button */}
      {/* <div className="register-link">
        <Button
          text="Go to Register"
          onClick={() => props.onRedirect("Register")}
        />
      </div> */}



    </div>
  );
};

export default Login;
