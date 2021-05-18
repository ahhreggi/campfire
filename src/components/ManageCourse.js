import PropTypes from "prop-types";
import "./ManageCourse.scss";

const ManageCourse = (props) => {

  ManageCourse.propTypes = {
    courseData: PropTypes.object,
    onEditCourse: PropTypes.func,
    onRedirect: PropTypes.func
  };

  const instructors = [];
  const students = [];
  for (const user of props.courseData.users) {
    if (user.role === "student") {
      students.push(user);
    } else if (user.role === "instructor") {
      instructors.push(user);
    }
  }

  return (
    <div className="ManageCourse">

      <div className="page-title">
        Manage course users
      </div>

      <hr />

      <div className="count">
        There are currently <span className="instructor">{instructors.length}</span> instructor(s) and <span className="student">{students.length}</span> student(s) enrolled in this course.
      </div>




    </div>
  );
};

export default ManageCourse;
