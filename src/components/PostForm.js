import { useState } from "react";
import ReactDOM from "react-dom";
import TextareaAutosize from "react-autosize-textarea";
import "./PostForm.scss";
import Button from "./Button";
import PropTypes from "prop-types";

const PostForm = (props) => {
  const [formHeight, setFormHeight] = useState("200px");
  PostForm.propTypes = {
    text: PropTypes.string,
    onChange: PropTypes.func
  };
  return (
    <div className="PostForm">
      <TextareaAutosize
        className="textarea"
        style={{ height: "100%" }}
        value={props.text}
        onChange={(e) => props.onChange(e)}
      />
    </div>
  );
};

export default PostForm;
