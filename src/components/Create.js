import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TextForm from "./EditForm/TextForm";
import Button from "./Button";
import "./Create.scss";

import DevData from "./DevData";

const Create = (props) => {

  Create.propTypes = {
    userData: PropTypes.object,
    onSubmit: PropTypes.func,
    errors: PropTypes.array,
    onRedirect: PropTypes.func
  };

  const [state, setState] = useState({
    name: "",
    description: "",
    code: "",
    errors: props.errors
  });

  useEffect(() => {
    setState({ ...state, errors: props.errors });
  }, [props.errors]);

  const handleInputChange = (event, field, maxLength = 250) => {
    if (event.target.value.length <= maxLength) {
      setState({ ...state, [field]: event.target.value, errors: null });
    } else {
      setState({ ...state, errors: [`Maximum character limit: ${maxLength}`]});
    }
  };

  const isValid = (string, field, limit = 250) => {
    if (field === "length") {
      const length = string.trim().length;
      return length > 0 && length <= limit;
    }
  };

  // Validate input fields prior to submitting the data
  const handleSubmit = () => {
    const errors = [];
    if (!state.name || !state.description || !state.code) {
      errors.push("Please complete all fields!");
    } else if (!isValid(state.name, "length", 40)) {
      errors.push("Title is too long!");
    } else if (!isValid(state.description, "length")) {
      errors.push("Description is too long!");
    } else if (!isValid(state.code, "length", 8)) {
      errors.push("Course code is too long!");
    }
    console.log(errors);
    // If there are any errors, display them to the user, otherwise sanitize and submit
    if (errors.length) {
      setState({ ...state, errors: errors });
    } else {
      const data = {
        name: state.name.trim(),
        description: state.description.trim()
      };
      props.onSubmit(data);
    }
  };

  return (
    <div className="Create">

      <DevData name="Create" props={props} />

      {/* Page Title */}
      <div className="page-title">
        Create Page
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
          label={"Course Name"}
          text={state.name}
          onChange={(event) => handleInputChange(event, "name", 40)}
        />

        <TextForm
          label={"Course Description"}
          text={state.description}
          onChange={(event) => handleInputChange(event, "description", 150)}
        />

        <TextForm
          label={"Course Code/Abbreviation (max 8 letters)"}
          text={state.code}
          onChange={(event) => handleInputChange(event, "code", 8)}
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

      {/* Join Button */}
      <div className="join-link">
        <Button
          text="Go to Join"
          onClick={() => props.onRedirect("Join")}
        />
      </div>

      {/* Home Button */}
      <div className="home-link">
        <Button
          text="Go to Home"
          onClick={() => props.onRedirect("Home")}
        />
      </div>

    </div>
  );
};

export default Create;
