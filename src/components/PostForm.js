import "./PostForm.scss";
import Button from "./Button";
import PropTypes from "prop-types";

const PostForm = (props) => {
  PostForm.propTypes = {
    onCancel: PropTypes.func
  };
  return (
    <div className="PostForm">
      This is PostForm.
      <Button
        text="CANCEL EDIT"
        styles="post-control"
        onClick={() => props.onCancel()}
      />
    </div>
  );
};

export default PostForm;
