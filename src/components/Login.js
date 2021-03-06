import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import InputField from "./InputField";
import Button from "./Button";
import "./Login.scss";

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
    setState({ ...state, [field]: event.target.value, errors: null });
  };

  // Validate registration fields prior to submitting the data
  const handleSubmit = () => {
    const errors = [];
    if (!state.email || !state.password) {
      errors.push("Invalid username/password");
    }
    // If there are any errors, display them to the user, otherwise submit
    if (errors.length) {
      setState({ ...state, errors: errors });
    } else {
      const data = {
        email: state.email,
        password: state.password
      };
      props.onSubmit(data);
    }
  };

  return (
    <div className="Login">

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

    </div>
  );
};

export default Login;
