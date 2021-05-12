import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TextForm from "./EditForm/TextForm";
import Button from "./Button";
import "./Login.scss";

const Login = (props) => {

  Login.propTypes = {
    onSubmit: PropTypes.func
  };

  const [state, setState] = useState({
    email: null,
    password: null
  });

  const handleInputChange = (event, field) => {
    setState({ ...state, [field]: event.target.value })
  };

  const handleSubmit = () => {
    const data = { ...state };
    props.onSubmit(data);
  };

  return (
    <div className="Login">

      {/* Page Title */}
      <div className="page-title">
        Login Page
      </div>

      {/* Form Fields */}
      <div className="form-fields">

        <TextForm
          label={"E-mail"}
          text={""}
          onChange={(event) => handleInputChange(event, "email")}
        />

        <TextForm
          label={"Password"}
          text={""}
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

    </div>
  );
};

export default Login;
