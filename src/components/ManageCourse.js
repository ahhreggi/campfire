import PropTypes from "prop-types";

const ManageCourse = (props) => {

  ManageCourse.propTypes = {
    courseData: PropTypes.object,
    onEditCourse: PropTypes.func,
    onRedirect: PropTypes.func
  };

  return (
    <div className="ManageCourse">
      Manage Course
    </div>
  );
};

export default ManageCourse;
