import PropTypes from "prop-types";
import EditForm from "./EditForm";
import "./CommentForm.scss";

const CommentForm = (props) => {

  CommentForm.propTypes = {
    header: PropTypes.string,
    label: PropTypes.string,
    userName: PropTypes.string,
    courseData: PropTypes.object,
    onAddComment: PropTypes.func,
    onCancelComment: PropTypes.func
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
        {props.header}
      </div>

      {/* <hr /> */}

      <div className="create-form">

        <EditForm
          label={props.label}
          author={props.userName}
          body={""}
          anonymous={false}
          onSave={createComment}
          onCancel={props.onCancelComment}
          mode={"COMMENT"}
          minHeight={"5rem"}
        />

      </div>

    </div>
  );
};

export default CommentForm;
