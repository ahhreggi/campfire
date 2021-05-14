import { useState } from "react";
import PropTypes from "prop-types";
import TextForm from "./EditForm/TextForm";
import Button from "./Button";
import "./Join.scss";

const Join = (props) => {

  Join.propTypes = {
    onSubmit: PropTypes.func
  };

  const [state, setState] = useState({
    accessCode: null
  });

  const handleInputChange = (event, field) => {
    setState({ ...state, [field]: event.target.value });
  };

  const handleSubmit = () => {
    const data = { ...state };
    props.onSubmit(data);
  };

  return (
    <div className="Join">

      {/* Page Title */}
      <div className="page-title">
        Join Page
      </div>

      {/* Form Fields */}
      <div className="form-fields">
        <TextForm
          label={"Course Access Code"}
          text={""}
          onChange={(event) => handleInputChange(event, "accessCode")}
        />

      </div>

      {/* Submit Button */}
      <div className="submit">
        <Button
          text="Join"
          styles="submit join"
          onClick={handleSubmit}
        />
      </div>

    </div>
  );
};

export default Join;
