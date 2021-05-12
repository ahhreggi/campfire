import PropTypes from "prop-types";
import EditForm from "./EditForm";
import "./CommentForm.scss";

const CommentForm = (props) => {

  CommentForm.propTypes = {
    userName: PropTypes.string,
    courseData: PropTypes.object,
    onAddComment: PropTypes.func
  };

  const createComment = (data) => {
    const newCommentData = {
      body: data.body,
      anonymous: data.anonymous
    };
    props.onAddComment(newCommentData);
  };

  return (
    <div className="CommentForm">

      <div className="header">
        Create a new comment
      </div>

      <hr />

      <div className="create-form">

        <EditForm
          author={props.userName}
          body={""}
          anonymous={false}
          onSave={createComment}
          mode={"COMMENT"}
        />

      </div>

    </div>
  );
};

export default CommentForm;
