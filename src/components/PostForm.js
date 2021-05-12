import PropTypes from "prop-types";
import EditForm from "./EditForm";
import "./PostForm.scss";

const PostForm = (props) => {

  PostForm.propTypes = {
    courseTags: PropTypes.array
  };

  return (
    <div>
      This is post form.
    </div>
  );
};

export default PostForm;
