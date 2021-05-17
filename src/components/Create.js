import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import BackButton from "./BackButton";
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
    code: "",
    name: "",
    description: "",
    errors: props.errors
  });

  useEffect(() => {
    setState({ ...state, errors: props.errors });
  }, [props.errors]);

  const handleInputChange = (event, field, maxLength) => {
    // console.log(event.target.value);
    if (event.target.value.length <= maxLength) {
      console.log(state[field].length, maxLength);
      console.log("hey");
      setState({ ...state, [field]: event.target.value, errors: null });
    } else {
      console.log("ERR");
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
      errors.push("Title is too long");
    } else if (!isValid(state.code, "length", 12)) {
      errors.push("Course code is too long!");
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
      props.onSubmit(data);
    }
  };

  return (
    <div className="Create">

      <DevData name="Create" props={props} />

      {/* Page Title */}
      <div className="page-title">
        Create a new course
      </div>

      <hr />

      {/* Page Text */}
      <div className="page-text">
        <div>
          Complete the form below to create a new course. You will automatically be enrolled as an <span className="instructor">instructor (owner)</span>, and will be provided with course <span className="access">access codes</span> to share with fellow instructors and students.
        </div>
        <div className="owner">
          As the owner of the course, you&apos;ll also be able to:
          <ul>
            <li><span>manage</span> student and instructor roles</li>
            <li><span>modify</span> course settings and information</li>
            <li><span>archive</span> the course at the end of the term</li>
          </ul>
        </div>
      </div>

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
            Course Name/Title
          </div>
          <input
            className="name"
            value={state.name}
            onChange={(event) => handleInputChange(event, "name", 40)}
            placeholder={"Introduction to Web Development"}
          />

          {/* Course Description */}
          <div className="form-label">
            Course Description (optional)
          </div>
          <textarea
            className="description"
            value={state.description}
            onChange={(event) => handleInputChange(event, "description", 150)}
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
            text="SUBMIT"
            styles="form green"
            onClick={handleSubmit}
            disabled={state.status === "success"}
          />
        </div>

      </div>

      {/* Back to Home */}
      <BackButton onRedirect={props.onRedirect} />

    </div>
  );
};

export default Create;
