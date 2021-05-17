import PropTypes from "prop-types";
import EditForm from "./EditForm";
import "./PostForm.scss";

import DevData from "./DevData";

const PostForm = (props) => {

  PostForm.propTypes = {
    userName: PropTypes.string,
    userRole: PropTypes.string,
    courseData: PropTypes.object,
    onAddPost: PropTypes.func,
    onRedirect: PropTypes.func
  };

  const createPost = (data) => {
    const newPostData = {
      ...data,
      courseID: props.courseData.id
    };
    props.onAddPost(newPostData);
  };

  return (
    <div className="PostForm">

      <DevData name="PostForm" props={props} />

      <div className="header">
        Create a new post
      </div>

      <hr />

      <div className="create-form">

        <EditForm
          label={"PREVIEW POST"}
          title={""}
          author={props.userName}
          role={props.userRole}
          isInstructor={props.userRole !== "student"}
          body={""}
          anonymous={false}
          tags={[]}
          courseTags={props.courseData.tags}
          onSave={createPost}
          onCancel={() => props.onRedirect("Dashboard")}
          mode={"POST"}
        />

      </div>

    </div>
  );
};

export default PostForm;
