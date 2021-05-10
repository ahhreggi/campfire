import "./PostForm.scss";
import TextareaAutosize from "react-autosize-textarea";
import PropTypes from "prop-types";

const PostForm = (props) => {

  PostForm.propTypes = {
    label: PropTypes.string,
    text: PropTypes.string,
    onChange: PropTypes.func,
    styles: PropTypes.string
  };

  return (
    <div className="PostForm">
      <div className="form-label">
        {props.label}
      </div>
      <TextareaAutosize
        className={`textarea ${props.styles}`}
        style={{ height: "100%" }}
        value={props.text}
        onChange={(event) => props.onChange(event)}
      />
    </div>
  );

};

export default PostForm;
