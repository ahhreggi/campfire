import PropTypes from "prop-types";
import EditForm from "./EditForm";
import "./PostForm.scss";

import axios from "axios";

const PostForm = (props) => {

  PostForm.propTypes = {
    userName: PropTypes.string,
    courseData: PropTypes.object,
    onAddPost: PropTypes.func
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

      <div className="header">
        Create a new post
      </div>

      <hr />

      <div className="create-form">

        <EditForm
          title={""}
          author={props.userName}
          body={""}
          anonymous={false}
          tags={[]}
          courseTags={props.courseData.tags}
          onSave={createPost}
          onCancel={() => console.log("cancelled!")}
          mode={"POST"}
        />

      </div>

    </div>
  );
};

export default PostForm;
