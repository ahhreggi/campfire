import "./PostForm.scss";
import Button from "./Button";
import PropTypes from "prop-types";

const PostForm = (props) => {
  PostForm.propTypes = {
    onSave: PropTypes.func,
    onCancel: PropTypes.func
  };
  return (
    <div className="PostForm">
      This is PostForm.
    </div>
  );
};

export default PostForm;
