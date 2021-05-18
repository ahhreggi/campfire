import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import "./Settings.scss";

const Settings = (props) => {

  Settings.propTypes = {
    courseData: PropTypes.object,
    onEditCourse: PropTypes.func,
    errors: PropTypes.array,
    onRedirect: PropTypes.func
  };

  const [state, setState] = useState({
    code: props.courseData.course_code,
    name: props.courseData.name,
    description: props.courseData.description,
    errors: props.errors
  });

  useEffect(() => {
    setState({ ...state, errors: props.errors });
  }, [props.errors]);

  const handleInputChange = (event, field, maxLength) => {
    // console.log(event.target.value);
    if (event.target.value.length <= maxLength) {
      setState({ ...state, [field]: event.target.value, errors: null });
    } else {
      setState({ ...state, errors: [`Reached maximum character length (${maxLength})`]});
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
    if (!state.name.trim() || !state.code.trim()) {
      errors.push("Please complete all fields");
    } else if (!isValid(state.name, "length", 40)) {
      errors.push("Name/summary is too long");
    } else if (!isValid(state.code, "length", 12)) {
      errors.push("Course code is too long");
    }
    console.log(errors);
    // If there are any errors, display them to the user, otherwise sanitize and submit
    if (errors.length) {
      setState({ ...state, errors: errors });
    } else {
      const data = {
        name: state.name.trim(),
        description: state.description.trim(),
        courseCode: state.code.trim()
      };
      props.onEditCourse(props.courseData.id, data);
    }
  };

  return (
    <div className="Create">

      {/* Page Title */}
      <div className="page-title">
        Course Settings
      </div>

      <hr />

      <div className="create-form">

        {/* Form Fields */}
        <div className="form-fields">

          {/* Course Code */}
          <div className="form-label">
            Course Code/Label
          </div>
          <input
            className="code"
            value={state.code}
            onChange={(event) => handleInputChange(event, "code", 12)}
            placeholder={"WEB 001"}
          />

          {/* Course Name */}
          <div className="form-label">
            Course Name/Summary
          </div>
          <input
            className="name"
            value={state.name}
            onChange={(event) => handleInputChange(event, "name", 40)}
            placeholder={"Intro to Web Development w/ Prof. Oak"}
          />

          {/* Course Description */}
          <div className="form-label">
            Course Description (optional)
          </div>
          <textarea
            className="description"
            value={state.description}
            onChange={(event) => handleInputChange(event, "description", 700)}
            placeholder={"What's the course about?"}
            rows={3}
          />

        </div>

        {/* Errors */}
        <div>
          <div className="error">
            {state.errors && state.errors.join("")}
          </div>
        </div>

        {/* Submit Button */}
        <div className="submit">
          <Button
            text="SAVE"
            styles="form green"
            onClick={handleSubmit}
            disabled={state.status === "success"}
          />
        </div>

      </div>

      <hr />

    </div>
  );
};

export default Settings;
