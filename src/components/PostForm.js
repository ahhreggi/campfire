import "./PostForm.scss";
import Button from "./Button";
import PropTypes from "prop-types";

const PostForm = (props) => {
  PostForm.propTypes = {
    text: PropTypes.string,
    onChange: PropTypes.func
  };
  return (
    <div className="PostForm">
      <textarea
        value={props.text}
        onChange={(e) => props.onChange(e)}
      />
    </div>
  );
};

export default PostForm;
