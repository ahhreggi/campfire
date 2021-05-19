import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import TagList from "./TagList";
import "./Create.scss";

const Create = (props) => {

  Create.propTypes = {
    onSubmit: PropTypes.func,
    errors: PropTypes.array,
    onRedirect: PropTypes.func
  };

  const [state, setState] = useState({
    code: "",
    name: "",
    description: "",
    tagField: "",
    previewTags: [],
    tags: [],
    errors: props.errors
  });

  useEffect(() => {
    setState({ ...state, errors: props.errors });
  }, [props.errors]);

  // Tag preview logic
  useEffect(() => {
    const newTags = state.tagField
      .split(",") // split by commas
      .map(tag => tag.trim().toLowerCase()) // remove whitespace
      .filter((tag, index, self) => self.indexOf(tag) === index) // remove duplicates
      .map(tag => tag.split(" ").filter(tag => !!tag).join(" ")); // remove repeated spaces
    const previewTags = newTags
      .map((tag, index) => ({ id: index, name: tag }))
      .filter((tag) => !!tag.name); // remove empty tags
    setState({ ...state, tags: newTags, previewTags: previewTags });
  }, [state.tagField]);

  // Input handler
  const handleInputChange = (event, field, maxLength) => {
    if (event.target.value.length <= maxLength) {
      setState({ ...state, [field]: event.target.value, errors: null });
    } else {
      setState({ ...state, errors: [`Reached maximum character length (${maxLength})`]});
    }
  };


  // Tag input handler
  const handleTags = (event) => {
    const tags = event.target.value
      .split(",")
      .map(tag => tag.split().join(" ").trim()); // remove repeated spaces
    // Check that the tags are within the length limit
    const longest = Math.max(...tags.map(tag => tag.length));
    // Check that the number of unique tags are <= 20
    const unique = tags.filter((tag, index, self) => self.indexOf(tag) === index).length; // remove duplicates
    // Check that the tags don't contain any invalid characters
    const valid = new RegExp("^[a-zA-Z0-9 ]*$").test(tags.join(""));
    if (longest > 12) {
      setState({ ...state, errors: ["Tags must be 12 characters or fewer in length"]});
    } else if (unique > 20) {
      setState({ ...state, errors: ["Maximum of 20 tags"]});
    } else if (!valid) {
      setState({ ...state, errors: ["Letters, numbers, and spaces only"]});
    } else {
      setState({ ...state, tagField: event.target.value, errors: null });
    }
  };

  // Validate a string given a field and limit
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
    // If there are any errors, display them to the user, otherwise sanitize and submit
    if (errors.length) {
      setState({ ...state, errors: errors });
    } else {
      const data = {
        name: state.name.trim(),
        description: state.description.trim(),
        courseCode: state.code.trim(),
        tags: state.tags.filter(tag => !!tag)
      };
      props.onSubmit(data);
    }
  };

  return (
    <div className="Create">

      {/* Page Title */}
      <div className="page-title">
        Create a new course
      </div>

      <hr />

      {/* Page Text */}
      <div className="page-text">
        <div>
          Complete the form below to create a new course. This information can be updated at any time through the course settings.
        </div>
        <div className="second">
          You will automatically be enrolled as an <span className="instructor">instructor (owner)</span>, and will be provided with course <span className="access">access codes</span> to share with fellow instructors and students.
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

          {/* Course Tags */}
          <div className="form-label">
            Course Tags (optional, separated by commas)
          </div>
          <input
            className="tag-input"
            value={state.tagField}
            onChange={(event) => handleTags(event)}
            placeholder={"html, css, react, ajax, etc."}
          />
          <div className="tag-preview">
            <TagList
              tags={state.previewTags}
              selectedTags={state.previewTags}
              disabled={true}
            />
          </div>

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

      <hr />

    </div>
  );
};

export default Create;
