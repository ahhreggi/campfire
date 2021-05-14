import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TextForm from "./EditForm/TextForm";
import Button from "./Button";
import "./Create.scss";

import DevData from "./DevData";

const Create = (props) => {

  Create.propTypes = {
    onSubmit: PropTypes.func
  };

  const [state, setState] = useState({
    name: null,
    description: null
  });

  const handleInputChange = (event, field) => {
    setState({ ...state, [field]: event.target.value });
  };

  const handleSubmit = () => {
    const data = { ...state };
    props.onSubmit(data);
  };

  return (
    <div className="Create">

      {/* Page Title */}
      <div className="page-title">
        Create Page
      </div>

      {/* Form Fields */}
      <div className="form-fields">
        <TextForm
          label={"Course Name"}
          text={""}
          onChange={(event) => handleInputChange(event, "name")}
        />

        <TextForm
          label={"Last Name"}
          text={""}
          onChange={(event) => handleInputChange(event, "description")}
        />

      </div>

      {/* Submit Button */}
      <div className="submit">
        <Button
          text="Create"
          styles="submit create"
          onClick={handleSubmit}
        />
      </div>

    </div>
  );
};

export default Create;
