import { useState } from "react";
import PropTypes from "prop-types";
import TextForm from "./EditForm/TextForm";
import Button from "./Button";
import "./Register.scss";

import DevData from "./DevData";

const Register = (props) => {

  Register.propTypes = {
    onSubmit: PropTypes.func
  };

  const [state, setState] = useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null
  });

  const handleInputChange = (event, field) => {
    setState({ ...state, [field]: event.target.value });
  };

  const handleSubmit = () => {
    const data = { ...state };
    props.onSubmit(data);
  };

  return (
    <div className="Register">

      <DevData name="Register" data={props} />

      {/* Page Title */}
      <div className="page-title">
        Register Page
      </div>

      {/* Form Fields */}
      <div className="form-fields">
        <TextForm
          label={"First Name"}
          text={""}
          onChange={(event) => handleInputChange(event, "firstName")}
        />

        <TextForm
          label={"Last Name"}
          text={""}
          onChange={(event) => handleInputChange(event, "lastName")}
        />

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
          text="Register"
          styles="submit register"
          onClick={handleSubmit}
        />
      </div>

      {/* <Link to="/login">Login</Link> */}

    </div>
  );
};

export default Register;
